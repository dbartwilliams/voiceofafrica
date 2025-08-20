import React from 'react'
import { Link } from "react-router-dom";
import { getAllPosts } from "../services/index/posts";
import ArticleCardSkeleton from "../components/ArticleCardSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { FaArrowRight } from "react-icons/fa";
import ArticleCard from '../components/ArticleCard';

const Articles = () => {

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts("", 1, 4),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return (
    <section className="container flex flex-col px-5 py-10 mx-auto">
      <div className="flex flex-wrap pb-10 md:gap-x-5 gap-y-5">
            <h1 className='text-2x1 tracking-[.4em] textcol'>LATEST ARTICLES</h1> 

            {isLoading ? (
              [...Array(3)].map((item, index) => (
                <ArticleCardSkeleton
                  key={index}
                  />
                ))
              ) : isError ? (
                <ErrorMessage message="Couldn't fetch the posts data" />
              ) : (
              data?.data.map((post) => (
              <ArticleCard
                  key={post._id}
                  post={post}
                />
            ))
          )}
       </div>

       <Link  
        to="/blog" 
        className='flex items-center px-6 py-3 mx-auto font-bold bg-gray-800 rounded-lg gap-x-2'
        >
        <span className='textcol'>LoadMore</span>
        <FaArrowRight className="w-3 h-3 cursor-pointer" />
      </Link>
    </section>
  )
}
export default Articles