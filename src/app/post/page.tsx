"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchPosts } from "../redux/postsSlice";
import CommonImage from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const POSTS_PER_PAGE = 8; // Number of posts per batch

const PostArticle: React.FC = () => {
  const { posts, loading } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + POSTS_PER_PAGE);
  };

  return (
    <>
      <div className="commonbanner-form py-10">
        <div className="container m-auto">
          <h2 className="text-center">Reading Resources</h2>
          <h1 className="text-center">Articles, News, Test Prep Material</h1>
          <div className="tab-article-container mt-10">
              <ul className="flex gap-5 bg-white justify-center relative z-10 m-auto w-auto w-2/4">
                <li className="active">
                  <Button asChild>
                    <Link href="/post">Articles</Link>
                  </Button>
                </li>
                <li>
                  <Button asChild>
                    <Link href="/">Test-prep material</Link>
                  </Button>
                </li>
                <li>
                  <Button asChild>
                    <Link href="/">News</Link>
                  </Button>
                </li>
              </ul>  
          </div>
        </div>
        <div className="bgvector">
          <CommonImage
            classname="bg-cont"
            src="/images/background.webp"
            alt="Background"
            width={1938}
            height={624}
          />
        </div>
      </div>
      <div className="container m-auto mt-10">
        <div className="post__widget flex gap-5 flex-wrap justify-center w-full">
          {loading
            ? // ✅ Skeleton UI while loading
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="post__widget-inner w-1/4 p-4">
                  <div className="animate-pulse">
                    <div className="bg-gray-300 h-48 w-full rounded-md"></div>
                    <div className="bg-gray-300 h-6 w-3/4 mt-4 rounded"></div>
                    <div className="bg-gray-300 h-4 w-1/2 mt-2 rounded"></div>
                    <div className="bg-gray-300 h-16 w-full mt-4 rounded"></div>
                  </div>
                </div>
              ))
            : // ✅ Render only visible posts
              posts.slice(0, visibleCount).map((item) => (
                <Link
                  key={item.id}
                  className="post__widget-inner w-1/4 p-4"
                  href={`/post/${item.id}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <div className="item_title text-lg font-semibold mt-2">{item.title}</div>
                  <div className="item_publishedAt text-sm text-gray-500">{item.publishedAt}</div>
                  <div className="item_description text-gray-700 mt-2">
                    {item.content.slice(0, 100)}...
                  </div>
                </Link>
              ))}
        </div>

        {/* ✅ Load More Button */}
        {visibleCount < posts.length && !loading && (
          <div className="w-full loader-btn py-10 flex justify-center">
            <Button variant="link" onClick={handleLoadMore}>
              Load More
              <CommonImage
                classname="large-arrow"
                src="/images/our-services-arrow.webp"
                alt="arrow"
                width={43}
                height={12}
              />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default PostArticle;
