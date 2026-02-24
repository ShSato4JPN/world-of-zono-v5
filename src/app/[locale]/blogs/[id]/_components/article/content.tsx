"use client";

import { ImagePreview } from "@/components/blog/ImagePreview";
import { useArticleContent } from "@/hooks/ariticle-content";
import { motion } from "framer-motion";

type Props = {
  content: string;
};

export default function ArticleContent({ content }: Props) {
  const { previewImage, handleImageClick, handleImageClose } =
    useArticleContent();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="article-content"
        onClick={handleImageClick}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <ImagePreview
        src={previewImage?.src || ""}
        alt={previewImage?.alt || ""}
        isOpen={previewImage !== null}
        onClose={handleImageClose}
      />
    </>
  );
}
