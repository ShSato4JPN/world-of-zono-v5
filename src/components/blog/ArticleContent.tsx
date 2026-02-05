"use client";

import type { DOMNode, Element } from "html-react-parser";
import parse, { domToReact } from "html-react-parser";
import { motion } from "framer-motion";
import { generateSlug } from "@/lib/toc";

type Props = {
  content: string;
};

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

export function ArticleContent({ content }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="article-content"
    >
      {parse(content, {
        replace: (domNode) => {
          if (!isElement(domNode)) return;

          const { name, children } = domNode;

          if (name === "h2" || name === "h3" || name === "h4") {
            const text = children
              ? (children as DOMNode[]).map(getTextContent).join("")
              : "";
            const id = generateSlug(text);
            const Tag = name;

            return (
              <Tag id={id}>
                {children && domToReact(children as DOMNode[])}
              </Tag>
            );
          }
        },
      })}
    </motion.div>
  );
}
