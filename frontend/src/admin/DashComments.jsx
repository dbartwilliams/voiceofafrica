import React from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDataTable } from "../hooks/useDataTable";
import { formatDistanceToNow } from 'date-fns';
import Image from "../components/Image";
import { getAvatarPath } from '../util/imageKitHelper';
import {
  deleteComment,
  getAllComments,
  updateComment,
} from "../services/index/comments";
import DataTable from "../components/DataTable";
import { Link } from "react-router-dom";

const DashComments = () => {
  const {
    userState,
    currentPage,
    searchKeyword,
    data: commentsData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () =>
      getAllComments(userState.userInfo.token, searchKeyword, currentPage),
    dataQueryKey: "comments",
    deleteDataMessage: "Comment is deleted",
    mutateDeleteFn: ({ slug, token }) => {
      return deleteComment({
        commentId: slug,
        token,
      });
    },
  });

  const {
    mutate: mutateUpdateCommentCheck,
    isLoading: isLoadingUpdateCommentCheck,
  } = useMutation({
    mutationFn: ({ token, check, commentId }) => {
      return updateComment({ token, check, commentId });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["comments"]);
      toast.success(
        data?.check ? "CComment is approved" : "Comment is not approved"
      );
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return (
    <DataTable
      pageTitle="Manage Comments"
      dataListName="Comments"
      searchInputPlaceHolder="Search Comments..."
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={[
        "Author",
        "Comment",
        "In Respond to",
        "Created At",
        "",
      ]}
      isFetching={isFetching}
      isLoading={isLoading}
      data={commentsData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={commentsData?.headers}
    >
      {commentsData?.data.map((comment) => (
        <tr>
          <td className="px-5 py-5 text-sm bg-gray-800 border-b border-gray-700">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="relative block">

                  <Image
                  src={getAvatarPath(comment?.user?.avatar)}
                  alt={comment?.user?.name}
                  className="object-cover w-10 mx-auto rounded-lg aspect-square"
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-gray-200 whitespace-no-wrap">
                  {comment?.user?.name}
                </p>
              </div>
            </div>
          </td>
          <td className="px-5 py-5 text-sm bg-gray-800 border-b border-gray-700">
            {comment?.replyOnUser !== null && (
              <p className="text-gray-200 whitespace-no-wrap">
                In reply to{" "}
                <Link
                  to={`/blog/${comment?.post?.slug}/#comment-${comment?._id}`}
                  className="text-blue-500"
                >
                  {comment?.replyOnUser?.name}
                </Link>
              </p>
            )}
            <p className="text-gray-200 whitespace-no-wrap">{comment?.desc}</p>
          </td>
          <td className="px-5 py-5 text-sm bg-gray-800 border-b border-gray-700">
            <p className="text-gray-200 whitespace-no-wrap">
              <Link
                to={`/blog/${comment?.post?.slug}`}
                className="text-blue-500"
              >
                {comment?.post?.title}
              </Link>
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-gray-800 border-b border-gray-700">
            <p className="text-gray-200 whitespace-no-wrap">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </p>
          </td>
          <td className="px-5 py-5 space-x-5 text-sm bg-gray-800 border-b border-gray-700">
            <button
              disabled={isLoadingDeleteData}
              type="button"
              className={`${
                comment?.check
                  ? "text-yellow-600 hover:text-yellow-900"
                  : "text-green-600 hover:text-green-900"
              } disabled:opacity-70 disabled:cursor-not-allowed`}
              onClick={() => {
                mutateUpdateCommentCheck({
                  token: userState.userInfo.token,
                  check: comment?.check ? false : true,
                  commentId: comment._id,
                });
              }}
            >
              {comment?.check ? "Unapprove" : "Approve"}
            </button>
            <button
              disabled={isLoadingDeleteData}
              type="button"
              className="p-2 text-black bg-red-400 rounded cursor-pointer hover:bg-red-600 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() => {
                deleteDataHandler({
                  slug: comment?._id,
                  token: userState.userInfo.token,
                });
              }}
            >
              Delete
            </button>
          </td>

        </tr>
      ))}
    </DataTable>
  );
};

export default DashComments;
