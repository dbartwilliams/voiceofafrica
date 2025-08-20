import React from "react";
import { formatDistanceToNow } from 'date-fns';
import { FiMessageSquare, FiEdit2, FiTrash } from "react-icons/fi";

import { images } from "../constants";
import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  logginedUserId,
  affectedComment,
  setAffectedComment,
  addComment,
  parentId = null,
  updateComment,
  deleteComment,
  replies,
}) => {
  const isUserLoggined = Boolean(logginedUserId);
  const commentBelongsToUser = logginedUserId === comment.user._id;
  const isReplying =
    affectedComment &&
    affectedComment.type === "replying" &&
    affectedComment._id === comment._id;
  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment._id === comment._id;
  const repliedCommentId = parentId ? parentId : comment._id;
  const replyOnUserId = comment.user._id;

  return (
    <div
      className="flex items-start p-3 bg-gray-800 rounded-lg flex-nowrap gap-x-3"
      id={`comment-${comment?._id}`}
    >
      <img
        src={
          comment?.user?.avatar
            ? stables.UPLOAD_FOLDER_BASE_URL + comment.user.avatar
            : images.userImage
        }
        alt="user profile"
        className="object-cover rounded-full w-9 h-9"
      />
      <div className="flex flex-col flex-1">
        <h5 className="text-xs font-bold text-[#5eeccc] lg:text-sm">
          {comment.user.name}
        </h5>
        <span className="text-xs text-gray-300">
        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
        </span>
        {!isEditing && (
          <p className="font-opensans mt-[10px] text-[18px]">
            {comment.desc}
          </p>
        )}
        {isEditing && (
          <CommentForm
            btnLabel="Update"
            formSubmitHanlder={(value) => updateComment(value, comment._id)}
            formCancelHandler={() => setAffectedComment(null)}
            initialText={comment.desc}
          />
        )}
        <div className="flex items-center mt-3 mb-3 text-sm text-gray-300 gap-x-3">
          {isUserLoggined && (
            <button
             className="flex items-center px-2 py-1 space-x-2 rounded-full cursor-pointer hover:bg-yellow-100 hover:text-yellow-800"
              onClick={() =>
                setAffectedComment({ type: "replying", _id: comment._id })
              }
            >
              <FiMessageSquare className="w-4 h-auto" />
              <span>Reply</span>
            </button>
          )}
          {commentBelongsToUser && (
            <>
              <button
                className="flex items-center px-2 py-1 space-x-2 rounded-full cursor-pointer hover:bg-green-100 hover:text-green-600"
                onClick={() =>
                  setAffectedComment({ type: "editing", _id: comment._id })
                }
              >
                <FiEdit2 className="w-4 h-auto " />
                <span>Edit</span>
              </button>
              <button
                className="flex items-center px-2 py-1 space-x-2 rounded-full cursor-pointer hover:bg-red-100 hover:text-red-600"
                onClick={() => deleteComment(comment._id)}
              >
                <FiTrash className="w-4 h-auto " />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
        {isReplying && (
          <CommentForm
            btnLabel="Reply"
            formSubmitHanlder={(value) =>
              addComment(value, repliedCommentId, replyOnUserId)
            }
            formCancelHandler={() => setAffectedComment(null)}
          />
        )}
        {replies.length > 0 && (
          <div>
            {replies.map((reply) => (
              <Comment
                key={reply._id}
                addComment={addComment}
                affectedComment={affectedComment}
                setAffectedComment={setAffectedComment}
                comment={reply}
                deleteComment={deleteComment}
                logginedUserId={logginedUserId}
                replies={[]}
                updateComment={updateComment}
                parentId={comment._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;