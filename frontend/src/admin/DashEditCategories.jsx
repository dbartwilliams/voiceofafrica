import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getSingleCategory,
  updateCategory,
} from "../services/index/postCategories";

const DashEditCategories = () => {
  const queryClient = useQueryClient();
  const [categoryTitle, setCategoryTitle] = useState("");
  const navigate = useNavigate();
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSingleCategory({ slug }),
    queryKey: ["categories", slug],
    // onSuccess: (data) => {
    //   setCategoryTitle(data?.title || "");
    // },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setCategoryTitle(data.title || "");
    }
  }, [data]);

  const { mutate: mutateUpdateCategory, isLoading: isLoadingUpdateCategory } =
    useMutation({
      mutationFn: ({ title, slug, token }) => {
        return updateCategory({
          title,
          slug,
          token,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["categories", slug]);
        toast.success("Category is updated");
        navigate(`/dashboard/categories/edit/${data._id}`, {
          replace: true,
        });
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const handleUpdateCategory = () => {
    if (!categoryTitle) return;
    mutateUpdateCategory({
      title: categoryTitle,
      slug,
      token: userState.userInfo.token,
    });
  };

  return (
    <div className="col-span-4 py-8">
      <h4 className="text-lg leading-tight">Update Category</h4>
      <div className="w-full mt-6 d-form-control">
        <input
          value={categoryTitle}
         className="py-1.5 pl-2 text-lg font-medium border border-gray-600 rounded-l d-input d-input-bordered"
          onChange={(e) => setCategoryTitle(e.target.value)}
          placeholder="category title"
        />
        <button
          disabled={isLoadingUpdateCategory || isLoading || isError}
          type="button"
          onClick={handleUpdateCategory}
         className="px-4 py-2 mt-3 font-semibold text-black bg-[#5eeccc] rounded-r w-fit disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
        >
          Update Category
        </button>
      </div>
    </div>
  );
};

export default DashEditCategories;