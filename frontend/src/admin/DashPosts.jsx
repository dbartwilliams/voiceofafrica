import { deletePost, getAllPosts } from "../services/index/posts";
import Pagination from "../components/Pagination";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useDataTable } from "../hooks/useDataTable";
import DataTable from "../components/DataTable";
import Image from "../components/Image";
import { getPostImagePath } from '../util/imageKitHelper';


const DashPosts = () => {
  const {
    userState,
    currentPage,
    searchKeyword,
    data: postsData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () => getAllPosts(searchKeyword, currentPage),
    dataQueryKey: "posts",
    deleteDataMessage: "Post is deleted",
    mutateDeleteFn: ({ slug, token }) => {
      return deletePost({
        slug,
        token,
      });
    },
  });

  return (
    <DataTable
      pageTitle="Manage Posts"
      dataListName="Posts"
      searchInputPlaceHolder="Post title..."
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={[
        "Photo and Title",
        "Category",
        "Created At",
        "Tags",
        "",
      ]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={postsData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={postsData?.headers}
      userState={userState}
    >
      {postsData?.data.map((post) => {


        return (
          <tr key={post._id}>
            <td className="px-5 py-5 text-sm text-white bg-gray-800 border-b border-gray-700">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <a href="/" className="relative block">
                    <Image
                     src={getPostImagePath(post.photo)}
                      alt={post.title}
                      className="object-cover w-10 mx-auto rounded-lg aspect-square"
                    />
                  </a>
                </div>
                <div className="ml-3">
                  <p className="text-gray-200 whitespace-no-wrap">
                    {post.title}
                  </p>
                </div>
              </div>
            </td>
            <td className="px-5 py-5 text-sm bg-gray-800 border-b border-gray-700">
              <p className="text-gray-200 whitespace-no-wrap">
                {post.categories.length > 0
                  ? post.categories
                      .slice(0, 3)
                      .map(
                        (category, index) =>
                          `${category.title}${
                            post.categories.slice(0, 3).length === index + 1
                              ? ""
                              : ", "
                          }`
                      )
                  : "Uncategorized"}
              </p>
            </td>
            <td className="px-5 py-5 text-sm bg-gray-800 border-b border-gray-700">
              <p className="text-gray-200 whitespace-no-wrap">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </td>
            <td className="px-5 py-5 text-sm bg-gray-800 border-b border-gray-700">
              <div className="flex gap-x-2">
                {post.tags.length > 0
                  ? post.tags.map((tag, index) => (
                      <p key={index}>
                        {tag}
                        {post.tags.length - 1 !== index && ","}
                      </p>
                    ))
                  : "No tags"}
              </div>
            </td>
            <td className="px-5 py-5 space-x-5 text-sm bg-gray-800 border-b border-gray-700">
              <button
                disabled={isLoadingDeleteData}
                type="button"
                className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={() => {
                  deleteDataHandler({
                    slug: post?.slug,
                    token: userState.userInfo.token,
                  });
                }}
              >
                Delete
              </button>
              <Link
                to={`/dashboard/posts/edit/${post?.slug}`}
                className="text-green-600 hover:text-green-900"
              >
                Edit
              </Link>
            </td>
          </tr>
        );
      })}
    </DataTable>
  );
};

export default DashPosts;








