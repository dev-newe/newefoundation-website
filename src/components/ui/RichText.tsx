import { RichText as RichTextRenderer } from "@payloadcms/richtext-lexical/react";
import { cn } from "@/lib/utils";
import { SerializedEditorState } from "lexical";

type RichTextProps = {
  content?: SerializedEditorState;
  className?: string;
};

export default function RichText({ content, className }: RichTextProps) {
  if (!content) {
    return null;
  }

  return (
    <div className={cn("rich-text", className)}>
      <RichTextRenderer data={content} />
    </div>
  );
}
