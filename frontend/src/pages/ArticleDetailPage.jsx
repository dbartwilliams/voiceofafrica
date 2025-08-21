import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Image from "../components/Image";
import { getPostImagePath } from '../util/imageKitHelper';

import BreadCrumbs from "../components/BreadCrumbs";
import MainLayout from "../layouts/MainLayout";
import MetaTags from "../util/MetaTags"
import SocialShareButtons from "../components/SocialShareButtons";
import CommentsContainer from "../comments/CommentsContainer";
import SuggestedPosts from "./SuggestedPosts";
import { getAllPosts,getSinglePost } from "../services/index/posts";
import ArticleDetailSkeleton from '../components/ArticleDetailSkeleton';
import ErrorMessage from '../components/ErrorMessage'
import { useSelector } from "react-redux";
import parseJsonToHtml from "../util/parseJsonToHtml";
import { images } from "../constants";

const ArticleDetailPage = () => {
    const { slug } = useParams();
    const userState = useSelector((state) => state.user);
    const [breadCrumbsData, setbreadCrumbsData] = useState([]);
    const [body, setBody] = useState(null);
  
    const { data, isLoading, isError } = useQuery({
      queryFn: () => getSinglePost({ slug }),
      queryKey: ["blog", slug],
      onSuccess: (data) => {
        setbreadCrumbsData([
          { name: "Home", link: "/" },
          { name: "Blog", link: "/blog" },
          { name: "Article title", link: `/blog/${data.slug}` },
        ]);
        setBody(parseJsonToHtml(data?.body));
      },
      
    });
  
    const { data: postsData } = useQuery({
      queryFn: () => getAllPosts(),
      queryKey: ["posts"],
    });

  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    if (isLoading) return <ArticleDetailSkeleton />;
    if (isError) return <ErrorMessage message="Couldn't fetch the post detail" />;
  
    return (
      <MainLayout>
        {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post detail" />
      ) : (
        <>

          <MetaTags 
              title={data?.title}
              caption={data?.caption?.substring(0, 150)}
              Image={getPostImagePath(data?.photo)}
              slug={`blog/${data?.slug}`}
          />

        <section className="container flex flex-col max-w-6xl py-5 mx-auto px-9 lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1 px-5 pb-2">
          <BreadCrumbs data={breadCrumbsData} />
            {/* ARTICLE IMAGE */}
            
            {data.photo && (
              <Image
                className="rounded-xl w-[700px] transition-transform duration-500 ease-in-out transform hover:scale-105"
                // This is now correct: use data.photo if it exists, otherwise use the fallback.
                src={getPostImagePath(data.photo)}
              />
            )}
                        
            
            {/* ARTICLE CATEGORY */}
                       <div className="flex gap-2 mt-4">
              {data?.categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/blog?category=${category.name}`}
                  className="inline-block text-sm text-blue-400 md:text-base"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <h1 className="text-xl font-bold mt-4 md:text-[26px] textcol border-b pb-2 border-gray-600">
                {data?.title}
            </h1>

            {/*ARTICLE CONTENT  */}
            <div className="w-full mt-5 text-white bg-transparent max-w-none">
            {!isLoading && !isError && (
            <div
                    className="
                    text-[20px] 
                    leading-relaxed 
                    tracking-wide 
                    prose  
                    prose-invert 
                    max-w-none 
                    prose-headings:mb-4 
                    prose-headings:text-3xl 
                    prose-p:mb-6  
                    [&_*]:!text-inherit" // Add this line
                    dangerouslySetInnerHTML={{ __html: data?.body }}
                />
                )}
            </div>

            <CommentsContainer
                comments={data?.comments}
                logginedUserId={userState?.userInfo?._id}
                postSlug={slug}
                className="mt-10"
                />
          </article>
  
          <div>
            <SuggestedPosts
                header="Latest Articles"
                posts={postsData?.data}
                tags={data?.tags}
                className="mt-8 lg:mt-0 lg:max-w-xs"
                />
            <div className="p-3 mt-7">
                <h2 className="mb-4 font-medium text-dark-hard md:text-xl">
                    Share on:
                </h2>
               <SocialShareButtons
                    url={encodeURI(window.location.href)}
                    title={encodeURIComponent(data?.title)}
                />

                <div className="flex flex-col items-center w-full mt-10">
                    <h1 className="mb-4 text-base text-[#5eeccc] tracking-[.1em]">
                    First People on the Planet
                    </h1>
                    <img 
                        src= {images.SuggestedImg} 
                        alt="advertisement" 
                        className="w-[300px] h-[200px] rounded-lg shadow-md object-cover"
                    />
                 </div>
            </div>
          </div>
        </section>
        </>

        
         )}
      </MainLayout>
    );
  }; 
export default ArticleDetailPage;
