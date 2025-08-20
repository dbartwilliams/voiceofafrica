// uploadPictureMiddleware.js
import multer from "multer";
import ImageKit from "imagekit";

// Multer memory storage
const storage = multer.memoryStorage();

const uploadPicture = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpe?g|png|webp/;
    const extOk = allowed.test(file.originalname.toLowerCase());
    const mimeOk = allowed.test(file.mimetype);
    if (extOk && mimeOk) cb(null, true);
    else cb(new Error("Only JPEG, PNG, and WebP images are allowed"));
  },
});

const processImageUpload = async (req, res, next) => {
  if (!req.file) return next();

  // Lazy init ImageKit here
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });

  try {
    const result = await imagekit.upload({
      file: req.file.buffer,
      fileName: `${Date.now()}-${req.file.originalname}`,
      folder: "/img",
      useUniqueFileName: true,
    });

    req.imagekitResult = {
      url: result.url,
      fileId: result.fileId,
      thumbnailUrl: result.thumbnailUrl,
    };

    next();
  } catch (error) {
    console.error("ImageKit upload error:", error);
    return res.status(500).json({ error: "Image upload failed" });
  }
};

export { uploadPicture, processImageUpload };

