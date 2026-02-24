import { useCallback, useState } from "react";

export const useArticleContent = () => {
  const [previewImage, setPreviewImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const handleImageClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG") {
        const img = target as HTMLImageElement;
        setPreviewImage({ src: img.src, alt: img.alt });
      }
    },
    [],
  );

  const handleImageClose = useCallback(() => {
    setPreviewImage(null);
  }, []);

  return {
    previewImage,
    handleImageClick,
    handleImageClose,
  };
};
