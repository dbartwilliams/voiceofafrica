const IMAGEKIT_BASE = import.meta.env.VITE_IMAGEKIT_BASE_URL;

/**
 * Builds a full ImageKit URL for posts or avatars
 * Falls back to defaults if filename is missing
 *
 * @param {string} filename - Image file name
 * @param {"post" | "avatar"} type - Type of image
 * @returns {string}
 */
const getImageKitUrl = (filename, type = "post") => {
  if (filename) {
    return `${IMAGEKIT_BASE}/${type === "post" ? "img" : "avatar"}/${filename}`;
  }

  // Fallbacks
  return type === "avatar"
    ? `${IMAGEKIT_BASE}/avatar/default-avatar.png`
    : `${IMAGEKIT_BASE}/img/default-post.jpg`;
};

export default getImageKitUrl;

