import { Cloudinary } from "@cloudinary/url-gen";
import {
  fill,
  fit,
  limitFit,
  pad,
  thumbnail as thumbResize,
  scale,
} from "@cloudinary/url-gen/actions/resize";
import {
  format as deliveryFormat,
  quality as deliveryQuality,
} from "@cloudinary/url-gen/actions/delivery";
import { autoGravity, focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { auto as autoFormat } from "@cloudinary/url-gen/qualifiers/format";
import { auto as autoQuality } from "@cloudinary/url-gen/qualifiers/quality";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "limit" | "thumb" | "scale" | "pad" | string;
  quality?: "auto" | number | string;
  format?: "auto" | "webp" | "avif" | "jpg" | "png" | string;
  /** Only "auto" and "face" are applied (and only for fill/thumb crops). Other values are ignored. */
  gravity?: "auto" | "center" | "face" | string;
  /** Explicit cloud name to target, overriding environment defaults. */
  cloudName?: string;
}

/**
 * Single place that decides "is this a Cloudinary delivery URL we understand?".
 * If you ever move to a custom delivery domain, change it here (and note that the
 * path layout differs for private CDNs / CNAMEs, so parseCloudinaryUrl needs review too).
 */
const CLOUDINARY_DELIVERY_HOST = "res.cloudinary.com";

/**
 * Normalizes protocol-relative Cloudinary URLs (e.g. //res.cloudinary.com/...)
 * to full https URLs so URL parsing and hostname detection succeed.
 */
export const normalizeCloudinaryUrl = (url: string): string => {
  if (url.startsWith("//res.cloudinary.com")) {
    return `https:${url}`;
  }
  return url;
};

export const isCloudinaryUrl = (url: unknown): url is string => {
  if (typeof url !== "string") {
    return false;
  }
  try {
    const normalized = normalizeCloudinaryUrl(url.trim());
    return new URL(normalized).hostname === CLOUDINARY_DELIVERY_HOST;
  } catch {
    return false;
  }
};

export interface ParsedCloudinaryUrl {
  cloudName: string;
  resourceType: "image" | "video" | "raw";
  publicId: string;
  version?: string;
  existingTransforms?: string[];
}

/**
 * Cloudinary versions are "v" followed by digits (e.g. "v1", "v2", or a unix timestamp like "v1730000000").
 * Cloudinary documents that "v" followed by digits is reserved exclusively for version identifiers.
 */
const VERSION_SEGMENT = /^v\d+$/;

/**
 * Conservative patterns for transformation components. Used ONLY when the URL has no
 * version segment (with a version, everything before it is a transformation, no guessing).
 */
const TRANSFORM_PART_PATTERNS: RegExp[] = [
  /^(?:w|h|x|y|r|z|o)_(?:-?\d+(?:\.\d+)?|auto)$/,
  /^dpr_(?:auto|\d+(?:\.\d+)?)$/,
  /^ar_[\d.:]+$/,
  /^c_(?:scale|fit|limit|mfit|fill|lfill|pad|lpad|mpad|crop|thumb|auto)$/,
  /^f_(?:auto|webp|avif|jpg|jpeg|png|gif|svg|mp4|webm)$/,
  /^q_(?:auto(?::\w+)?|\d+)$/,
  /^g_(?:auto|face|faces|center|north|south|east|west|north_east|north_west|south_east|south_west)$/,
  /^t_[a-z0-9_:-]+$/i,
];

const isStrictTransformSegment = (segment: string): boolean =>
  segment.split(",").every((part) => TRANSFORM_PART_PATTERNS.some((re) => re.test(part)));

const safeDecode = (segment: string): string => {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
};

/**
 * BEST-EFFORT parser for Cloudinary "upload" delivery URLs.
 *
 * Prefer storing and passing the publicId (see cloudinaryPublicId on the Media doc);
 * this exists for external/legacy URLs only. Reverse-parsing a Cloudinary URL is
 * inherently ambiguous, so this is a heuristic, not a guarantee.
 *
 * Handles: chained transformation segments, version segments (including v1 and timestamps),
 * scheme-relative URLs, percent-encoded paths, and raw assets (extension kept).
 */
export const parseCloudinaryUrl = (rawUrl: string): ParsedCloudinaryUrl | null => {
  if (!isCloudinaryUrl(rawUrl)) {
    return null;
  }

  try {
    const url = normalizeCloudinaryUrl(rawUrl.trim());
    const pathParts = new URL(url).pathname.split("/").filter(Boolean);
    const [cloudName, resourceType, deliveryType, ...rest] = pathParts;

    if (!cloudName || deliveryType !== "upload") {
      return null;
    }
    if (resourceType !== "image" && resourceType !== "video" && resourceType !== "raw") {
      return null;
    }

    let idParts: string[];
    let existingTransforms: string[] | undefined;
    let version: string | undefined;

    const versionIdx = rest.findIndex((s) => VERSION_SEGMENT.test(s));

    if (versionIdx !== -1) {
      version = rest[versionIdx].replace(/^v/, "");
      const rawTransforms = rest.slice(0, versionIdx);
      if (rawTransforms.length > 0) {
        existingTransforms = rawTransforms;
      }
      idParts = rest.slice(versionIdx + 1);
    } else {
      let i = 0;
      while (i < rest.length - 1 && isStrictTransformSegment(rest[i])) {
        i++;
      }
      const rawTransforms = rest.slice(0, i);
      if (rawTransforms.length > 0) {
        existingTransforms = rawTransforms;
      }
      idParts = rest.slice(i);
    }

    if (!idParts || idParts.length === 0) {
      return null;
    }

    // pathname is percent-encoded; url-gen encodes again, so decode here to avoid %2520.
    let publicId = idParts.map(safeDecode).join("/");

    // Image/video URLs end in a format extension that is not part of the public_id.
    // Raw public_ids include their extension, so leave those alone.
    if (resourceType !== "raw") {
      publicId = publicId.replace(/\.[^/.]+$/, "");
    }

    if (!publicId) {
      return null;
    }
    return { cloudName, resourceType, publicId, version, existingTransforms };
  } catch {
    return null;
  }
};

/**
 * Builds a transformed IMAGE delivery URL using @cloudinary/url-gen.
 * Accepts either a publicId (preferred) or a full Cloudinary URL (best-effort).
 *
 * - Scheme-relative Cloudinary URLs (//res.cloudinary.com/...) are normalized and processed.
 * - Non-Cloudinary URLs, and Cloudinary URLs for video/raw assets, are returned unchanged.
 * - Existing transformation chains (like named transformation t_hero_crop) are preserved.
 * - Never throws: on any SDK error the original input is returned.
 * - Cloud name for bare publicIds comes from options, CLOUDINARY_CLOUD_NAME, or NEXT_PUBLIC_*.
 */
export const getCloudinaryUrl = (
  rawUrlOrPublicId: string | undefined | null,
  options: CloudinaryTransformOptions = {}
): string => {
  if (!rawUrlOrPublicId || typeof rawUrlOrPublicId !== "string") {
    return "";
  }

  const urlOrPublicId = rawUrlOrPublicId.trim();
  const normalizedInput = normalizeCloudinaryUrl(urlOrPublicId);
  const isUrl = /^https?:\/\//i.test(normalizedInput);

  let cloudName =
    options.cloudName ||
    process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  let publicId = urlOrPublicId;
  let version: string | undefined;
  let existingTransforms: string[] | undefined;

  const hasRequestedResize = Boolean(
    options.width ||
    options.height ||
    (options.crop && options.crop !== "fill") ||
    (options.format && options.format !== "auto") ||
    (options.quality && options.quality !== "auto") ||
    options.gravity
  );

  if (isUrl) {
    const parsed = parseCloudinaryUrl(normalizedInput);
    if (!parsed || parsed.resourceType !== "image") {
      return urlOrPublicId; // external URL, unsupported delivery type, or video/raw
    }

    // If the URL already has transformations and no new resize is requested, preserve it untouched.
    if (parsed.existingTransforms && parsed.existingTransforms.length > 0 && !hasRequestedResize) {
      return urlOrPublicId;
    }

    cloudName = options.cloudName || parsed.cloudName;
    publicId = parsed.publicId;
    version = parsed.version;
    existingTransforms = parsed.existingTransforms;
  }

  if (!cloudName) {
    if (!isUrl) {
      console.warn("[Cloudinary] No cloud name configured; cannot build URL from publicId.");
      return ""; // a bare publicId is not a usable src, let the caller fall back
    }
    return urlOrPublicId;
  }

  try {
    const cld = new Cloudinary({
      cloud: { cloudName },
      url: { analytics: false, secure: true },
    });

    const cldImage = cld.image(publicId);

    if (version) {
      cldImage.setVersion(version);
    }

    // Preserve any existing transformations (e.g. named transformations like t_hero_crop)
    if (existingTransforms && existingTransforms.length > 0) {
      for (const t of existingTransforms) {
        cldImage.addTransformation(t);
      }
    }

    const {
      width,
      height,
      crop = "fill",
      quality = "auto",
      format = "auto",
      gravity = "auto",
    } = options;

    if (width || height) {
      if (crop === "pad") {
        const resizeAction = pad();
        if (width) {
          resizeAction.width(width);
        }
        if (height) {
          resizeAction.height(height);
        }
        cldImage.resize(resizeAction);
      } else if (crop === "fit") {
        const resizeAction = fit();
        if (width) {
          resizeAction.width(width);
        }
        if (height) {
          resizeAction.height(height);
        }
        cldImage.resize(resizeAction);
      } else if (crop === "limit") {
        const resizeAction = limitFit();
        if (width) {
          resizeAction.width(width);
        }
        if (height) {
          resizeAction.height(height);
        }
        cldImage.resize(resizeAction);
      } else if (crop === "scale") {
        const resizeAction = scale();
        if (width) {
          resizeAction.width(width);
        }
        if (height) {
          resizeAction.height(height);
        }
        cldImage.resize(resizeAction);
      } else if (crop === "thumb") {
        const resizeAction = thumbResize();
        if (width) {
          resizeAction.width(width);
        }
        if (height) {
          resizeAction.height(height);
        }
        if (gravity === "auto") {
          resizeAction.gravity(autoGravity());
        } else if (gravity === "face") {
          resizeAction.gravity(focusOn(FocusOn.face()));
        }
        cldImage.resize(resizeAction);
      } else {
        // "fill" (default). Unknown crop strings also land here.
        const resizeAction = fill();
        if (width) {
          resizeAction.width(width);
        }
        if (height) {
          resizeAction.height(height);
        }
        if (gravity === "auto") {
          resizeAction.gravity(autoGravity());
        } else if (gravity === "face") {
          resizeAction.gravity(focusOn(FocusOn.face()));
        }
        cldImage.resize(resizeAction);
      }
    }

    if (format === "auto") {
      cldImage.delivery(deliveryFormat(autoFormat()));
    } else if (format) {
      cldImage.delivery(deliveryFormat(format));
    }

    if (quality === "auto") {
      cldImage.delivery(deliveryQuality(autoQuality()));
    } else if (typeof quality === "number" || typeof quality === "string") {
      cldImage.delivery(deliveryQuality(quality));
    }

    return cldImage.toURL();
  } catch (error) {
    console.error("[Cloudinary] Failed to build URL:", error);
    return isUrl ? urlOrPublicId : "";
  }
};
