"use client";

import { highlightCode } from "@/lib/highlight";
import { motion } from "framer-motion";
import type { DOMNode, Element } from "html-react-parser";
import parse, { domToReact } from "html-react-parser";
import { useState } from "react";
// import { ImagePreview } from "./ImagePreview";

function isElement(node: DOMNode): node is Element {
  return node.type === "tag";
}

function getTextContent(node: DOMNode): string {
  if (node.type === "text") {
    return node.data;
  }
  if (isElement(node) && node.children) {
    return (node.children as DOMNode[]).map(getTextContent).join("");
  }
  return "";
}

type Props = {
  stringHtml: string;
};

export default async function ArticleContent({ stringHtml }: Props) {
  const [previewImage, setPreviewImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const handleImageClick = (src: string, alt: string) => {
    setPreviewImage({ src, alt });
  };

  const handleClosePreview = () => {
    setPreviewImage(null);
  };

  const highlightedContent = await highlightCode(stringHtml);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="article-content"
      >
        {parse(stringHtml, {
          replace: (domNode) => {
            if (!isElement(domNode)) return;

            const { name, attribs, children } = domNode;

            if (name === "h2" || name === "h3" || name === "h4") {
              const text = children
                ? (children as DOMNode[]).map(getTextContent).join("")
                : "";
              // const id = generateSlug(text);
              const Tag = name;

              return (
                <Tag id={"test"}>
                  {children && domToReact(children as DOMNode[])}
                </Tag>
              );
            }

            if (name === "img") {
              const src = attribs?.src || "";
              const alt = attribs?.alt || "";

              return (
                <button
                  type="button"
                  className="block cursor-zoom-in"
                  onClick={() => handleImageClick(src, alt)}
                >
                  {/* biome-ignore lint/performance/noImgElement: CMS dynamic images */}
                  <img
                    src={src}
                    alt={alt}
                    className="hover:opacity-90 transition-opacity"
                  />
                </button>
              );
            }
          },
        })}
      </motion.div>

      {/* <ImagePreview
        src={previewImage?.src || ""}
        alt={previewImage?.alt || ""}
        isOpen={previewImage !== null}
        onClose={handleClosePreview}
      /> */}
    </>
  );
}
