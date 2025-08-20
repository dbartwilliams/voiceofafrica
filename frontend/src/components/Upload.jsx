import { IKContext, IKUpload } from "imagekitio-react";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const authenticator = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/upload-auth`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Upload = ({ children, type, setProgress, setData, onFileSelect }) => {
  const ikRef = useRef(null);
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const onError = (err) => {
    console.error("Upload error:", err);
    toast.error("Image upload failed!");
    setPreviewUrl(null);
  };

  const onSuccess = (res) => {
    setData(res);
  };

  const onUploadProgress = (progress) => {
    setProgress(Math.round((progress.loaded / progress.total) * 100));
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      if (onFileSelect) onFileSelect(file, url);

      setTimeout(() => {
        if (ikRef.current) ikRef.current.click();
      }, 100);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <IKContext
      publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={`${type}/*`}
        onChange={handleFileSelect}
      />

      <IKUpload
        useUniqueFileName
        onError={onError}
        onSuccess={onSuccess}
        onUploadProgress={onUploadProgress}
        className="hidden"
        ref={ikRef}
        folder="/posts"
      />

      <div className="cursor-pointer" onClick={() => fileInputRef.current.click()}>
        {children}
      </div>

      {previewUrl && (
        <div className="relative inline-block mt-4">
          {/* Remove button on top-right corner */}
          <button
            type="button"
            onClick={() => setPreviewUrl(null)}
            className="absolute z-10 px-2 py-1 text-sm text-white transition-colors bg-red-300 rounded shadow-md cursor-pointer top-1 right-1 hover:bg-red-400"
          >
            ✕
          </button>

          <img
            src={previewUrl}
            alt="Preview"
            className="w-[300px] max-h-64 h-auto border rounded-lg"
          />
        </div>
      )}
    </IKContext>
  );
};

export default Upload;
