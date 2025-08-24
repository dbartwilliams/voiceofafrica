// utils/imagePaths.js
export const getAvatarPath = (filename) => {
  return `avatars/${filename || 'default-avatar.png'}`;
};

export const getPostImagePath = (filename) => {
  return `posts/${filename || 'default-post.jpg'}`;
};
