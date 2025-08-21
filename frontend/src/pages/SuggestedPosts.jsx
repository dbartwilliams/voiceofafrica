import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import Image from "../components/Image";
import { getPostImagePath } from '../util/imageKitHelper';

const SuggestedPosts = ({ className, header, posts = [], tags }) => {
  return (
    <div
      className={`w-full shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-lg p-3 ${className}`}
    >
      <h2 className="font-medium text-[#5eeccc] md:text-xl">{header}</h2>

      <div className="grid mt-5 gap-y-4 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1">
        {posts.map((item) => {

          return (
            <div
              key={item._id}
              className="flex items-center space-x-2 flex-nowrap"
            >
              <Image
                className="object-cover w-1/5 transition-transform duration-500 ease-in-out transform rounded-lg cursor-pointer aspect-square hover:scale-105"
                src={getPostImagePath(item.photo)}
                alt='PostImg'
              />
              <div className="text-sm font-medium">
                <h3 className="text-sm font-medium md:text-base lg:text-sm">
                  <Link
                    to={`/blog/${item.slug}`}
                    className="hover:text-[#5eeccc] block truncate max-w-[200px]"
                    title={item.title}
                  >
                    {item.title}
                  </Link>
                </h3>
                <span className="text-xs opacity-60">
                  {formatDistanceToNow(new Date(item.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* TAGS */}
      <h2 className="mt-8 text-[#5eeccc] font-medium md:text-xl">Tags</h2>
      {tags.length === 0 ? (
        <p className="mt-2 text-xs text-slate-500">
          There are no tags for this post
        </p>
      ) : (
        <div className="flex flex-wrap mt-4 gap-x-2 gap-y-2">
          {tags.map((item, index) => (
            <Link
              key={index}
              to="/"
              className="inline-block bg-slate-800 rounded-md px-3 py-1.5 text-xs text-white md:text-sm"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuggestedPosts;



