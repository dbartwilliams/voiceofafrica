import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import Image from "../components/Image";
import { getAvatarPath, getPostImagePath } from '../util/imageKitHelper';

const ArticleCard = ({ post }) => {


  return (
    <div className="w-full p-4">
      <div className="flex flex-col overflow-hidden bg-white rounded shadow-md md:flex-row">
        {/* Image - Left (2/5 on desktop) */}
        <div className="flex-shrink-0 w-full md:w-2/5">
          <Link to={`/blog/${post.slug}`}>
            <Image
              src={getPostImagePath(post.photo)}
              alt={post.title}
              className="object-cover object-center w-full h-auto md:h-full"
              loading="lazy"
            />
          </Link>
        </div>

        {/* Content - Right (3/5 on desktop) */}
        <div className="flex flex-col justify-center w-full p-6 bg-gray-800 md:w-3/5">
          <Link to={`/blog/${post.slug}`} className="group">
            <h2 className="mb-2 lg:text-[26px] text-[22px] font-bold text-[#5eeccc] hover:text-[#1be415]">
              {post.title}
            </h2>
          </Link>

          <p className="mb-4 text-gray-300 lg:text-[24px] text-[18px]">
              {post.caption.length > 180
                  ? post.caption.slice(0, 250) + "....."
                  : post.caption}
          </p>

          {/* Profile + Date + Read More */}
          <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-700">
            {/* Left side - Avatar + user + date */}
            <Link to={`/blog/${post.slug}`}>
              <div className="flex items-center space-x-3">
                <Image
                  src={getAvatarPath(post.user.avatar)}
                  alt="user avatar"
                  className="object-cover w-10 h-10 rounded-full"
                />
                <span className="text-sm font-medium text-white border-b border-[#5eeccc] md:text-base hover:text-[#1be415]">
                  {post.user?.name}
                </span>
                <span className="text-sm text-white border-b border-[#5eeccc]">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </span>
              </div>
            </Link>

            {/* Right side - Read More */}
            <Link
              to={`/blog/${post.slug}`}
              className="text-sm font-medium text-white border-b border-[#5eeccc] hover:text-[#1be415]"
            >
              Read more →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;

