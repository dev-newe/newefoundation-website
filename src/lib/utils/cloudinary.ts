export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "limit" | "thumb" | "scale" | string;
  quality?: "auto" | number | string;
  format?: "auto" | "webp" | "avif" | "jpg" | "png" | string;
  gravity?: "auto" | "center" | "face" | string;
}

/**
 * Transforms a standard Cloudinary URL to include dynamic on-the-fly transformation flags.
 *
 * @example
 * getCloudinaryUrl("https://res.cloudinary.com/demo/image/upload/v123456/sample.jpg", { width: 400 })
 * // => "https://res.cloudinary.com/demo/image/upload/c_fill,f_auto,q_auto,w_400/v123456/sample.jpg"
 */
export const getCloudinaryUrl = (
  url: string | undefined | null,
  options: CloudinaryTransformOptions = {}
): string => {
  if (!url || typeof url !== "string") {
    return "";
  }

  // Pass through non-Cloudinary or non-upload delivery URLs as-is
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }

  const { width, height, crop = "fill", quality = "auto", format = "auto", gravity } = options;

  const transforms: string[] = [];

  if (crop && (width || height)) {
    transforms.push(`c_${crop}`);
  }
  if (format) {
    transforms.push(`f_${format}`);
  }
  if (gravity && (width || height)) {
    transforms.push(`g_${gravity}`);
  }
  if (height) {
    transforms.push(`h_${height}`);
  }
  if (quality) {
    transforms.push(`q_${quality}`);
  }
  if (width) {
    transforms.push(`w_${width}`);
  }

  if (transforms.length === 0) {
    return url;
  }

  const transformString = transforms.sort().join(",");
  const [baseUrl, rest] = url.split("/upload/");

  if (!rest) {
    return url;
  }

  // Check if transformation segment already exists before version (v1234) or public_id
  const firstSegment = rest.split("/")[0];
  const hasExistingTransforms = /^[a-z]_[a-z0-9_,-]+/i.test(firstSegment);

  if (hasExistingTransforms) {
    return url;
  }

  return `${baseUrl}/upload/${transformString}/${rest}`;
};
