import { useMemo } from "react";

const IMAGEKIT_BASE = import.meta.env.VITE_IMAGEKIT_BASE_URL;

/**
 * Returns a full ImageKit URL for a given filename and type.
 * Supports both posts (img) and avatars (avatar) with their own fallbacks.
 *
 * @param {string} filename - Name of the image file
 * @param {"post" | "avatar"} type - Type of image (defaults to "post")
 * @returns {string} - Full ImageKit URL
 */
const useImageKit = (filename, type = "post") => {
  return useMemo(() => {
    if (filename) {
      return `${IMAGEKIT_BASE}/${type === "post" ? "img" : "avatar"}/${filename}`;
    }

    // Fallbacks depending on type
    return type === "avatar"
      ? `${IMAGEKIT_BASE}/avatar/default-avatar.png`
      : `${IMAGEKIT_BASE}/img/default-post.jpg`;
  }, [filename, type]);
};

export default useImageKit;
