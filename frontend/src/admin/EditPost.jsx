import React, { useState, useEffect } from 'react' // Change to useEffect
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSinglePost, updatePost } from '../services/index/posts';
import ErrorMessage from '../components/ErrorMessage';
import ArticleDetailSkeleton from '../components/ArticleDetailSkeleton';
import Editor from "../components/editor/Editor";
import MultiSelectTagDropdown from "../components/MultiSelectTagDropdown";
import { getAllCategories } from "../services/index/postCategories";
import Image from "../components/Image";
import { getPostImagePath } from '../util/imageKitHelper';
import {
  categoryToOption,
  filterCategories,
} from "../util/multiSelectTagUtils";
import Upload from "../components/Upload";

const promiseOptions = async (inputValue) => {
  const { data: categoriesData } = await getAllCategories();
  return filterCategories(inputValue, categoriesData);
};

const EditPost = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const [body, setBody] = useState("");
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [postSlug, setPostSlug] = useState(slug);
  const [caption, setCaption] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [uploadedImageData, setUploadedImageData] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
    refetchOnWindowFocus: false,
  });

  // Handle successful image upload
  const handleUploadSuccess = (imageData) => {
    setUploadedImageData(imageData);
    toast.success("Image uploaded successfully!");
  };

  useEffect(() => {
    if (data) {
      setCategories(data.categories.map((item) => item._id) || []);
      setTitle(data?.title || "");
      setTags(data.tags || []);
      setCaption(data?.caption || "");
      setIsPublished(data?.isPublished || false);
      setBody(data?.body || "");
    }
  }, [data]);

  const { mutate: mutateUpdatePostDetail, isLoading: isLoadingUpdatePostDetail } = useMutation({
    mutationFn: ({ updatedData, slug, token }) => {
      return updatePost({ updatedData, slug, token });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["blog", slug]);
      toast.success("Post is updated");
      navigate(`/dashboard/posts/edit/${data.slug}`, { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleUpdatePost = async () => {
    const photoPath = uploadedImageData?.filePath || data?.photo;

    const updatedData = {
      title,
      body,
      categories,
      tags,
      isPublished,
      slug: postSlug,
      caption,
      photo: photoPath,
    };

    const formData = new FormData();
    formData.append("document", JSON.stringify(updatedData));

    mutateUpdatePostDetail({
      updatedData,
      slug,
      token: userState.userInfo.token,
    });
  };

  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete the uploaded image?")) {
      setUploadedImageData(null);
    }
  };

  let isPostDataLoaded = !isLoading && !isError;

  return (
    <div>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post detail" />
      ) : (
      <section className="container flex flex-col max-w-5xl px-5 py-5 mx-auto lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">

        {/* Image Upload Section */}
        <div className="mb-6">

          <Upload
               type="image"
              setProgress={setUploadProgress}
              setData={handleUploadSuccess}
              existingImage={data?.photo}>
              <div className="p-2 px-3 text-lg text-black bg-[#5eeccc] shadow-md w-max rounded cursor-pointer hover:bg-[#1be415] transition-colors">
                {uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : 'Upload Post Image'}
              </div>
            </Upload>

              {/* Show NEW uploaded image preview */}
              {uploadedImageData && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white">Preview & Ipload:</p>
                    <button
                      onClick={handleDeleteImage}
                      className="px-2 py-1 text-sm text-white bg-red-500 rounded cursor-pointer">
                      Remove
                    </button>
                  </div>
                  <Image
                    src={uploadedImageData.filePath}  // Use the NEW upload path directly
                    alt="New uploaded preview"
                    className="w-[300px] rounded-xl"
                  />
                </div>
              )}

              {/* Show EXISTING image from database (when no new upload) */}
              {!uploadedImageData && data?.photo && (
              <div className="mt-4">
                    <Image
                      src={getPostImagePath(data.photo)}  // Use helper for DB value
                      alt={data?.title}
                      className="w-[300px] rounded-xl"
                    />
              </div>
              )}
            </div>

            {/* Caregory */}
            <div className="flex gap-2 mt-4">
              {data?.categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/blog?category=${category.name}`}
                  className="inline-block text-sm text-primary font-roboto md:text-base"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Title + isPublished */}
            <div className="w-full p-3 d-form-control">
              <label className="d-label" htmlFor="title">
                <span className="text-white">Title</span>
              </label>
              <div className="flex items-center gap-4">
                <input
                  value={title}
                  id="title"
                  className="flex-1 p-2 text-[18px] font-medium !text-white border border-gray-700 rounded"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label className="flex items-center gap-2 text-white">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-5 h-5 accent-green-600"
                  />
                  Published
                </label>
              </div>
            </div>

              {/* Caption */}
              <div className="w-full d-form-control">
                <label className="d-label" htmlFor="caption">
                  <span className="d-label-text">Caption</span>
                </label>
                <textarea
                  id="caption"
                  value={caption}
                  className="w-full p-3 text-[18px] font-medium border border-gray-700 rounded resize-none h-35"
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="caption"
                />
            </div>

            {/* Slug */}
            <div className="w-full d-form-control">
              <label className="d-label" htmlFor="slug">
                <span className="d-label-text">Slug</span>
              </label>
              <input
                id="slug"
                value={postSlug}
                className="w-full p-2 text-[18px] font-medium text-white border border-gray-700 rounded"
                onChange={(e) =>
                  setPostSlug(e.target.value.replace(/\s+/g, "-").toLowerCase())
                }
                placeholder="post slug"
              />
            </div>

            {/* Categories dropdown */}
            <div className="mt-2 mb-5">
              <label className="d-label">
                <span className="d-label-text">Categories</span>
              </label>
              {isPostDataLoaded && (
                <MultiSelectTagDropdown
                  loadOptions={promiseOptions}
                  defaultValue={data.categories.map(categoryToOption)}
                  onChange={(newValue) =>
                    setCategories(newValue.map((item) => item.value))
                  }
                />
              )}
            </div>

            {/* Tags */}
            <div className="mt-2 mb-5">
              <label className="d-label">
                <span className="d-label-text">Tags</span>
              </label>
              {isPostDataLoaded && (
                <CreatableSelect
                  defaultValue={data.tags.map((tag) => ({
                    value: tag,
                    label: tag,
                  }))}
                  isMulti
                  onChange={(newValue) =>
                    setTags(newValue.map((item) => item.value))
                  }
                  className="relative z-20"
                />
              )}
            </div>

              {/* Editor */}
              <div className="w-full mb-3 bg-white">
              {isPostDataLoaded && (
                <Editor
                  content={data?.body}
                  editable={true}
                  onDataChange={(data) => {
                    setBody(data);
                  }}
                />
              )}
            </div>

            <button
              disabled={isLoadingUpdatePostDetail}
              type="button"
              onClick={handleUpdatePost}
              className="w-full px-4 py-2 font-semibold text-black bg-[#5eeccc] hover:bg-[#1be415] rounded disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
            >
              Update Post
            </button>
          </article>
      </section>
      )}
    </div>
  );
};

export default EditPost;