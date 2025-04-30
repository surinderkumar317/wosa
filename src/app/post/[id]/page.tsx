"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById, fetchRelatedPosts } from "../../redux/postsSlice";
import { RootState, AppDispatch } from "../../redux/store";

const PostDetail: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { post, relatedPosts, loading } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id as string));
      dispatch(fetchRelatedPosts(id as string));
    }
  }, [dispatch, id]);

  // ✅ Skeleton UI while loading
  if (loading || !post) {
    return (
      <div className="container m-auto article-container animate-pulse">
        {/* Skeleton for Main Post */}
        <div className="post-detail space-y-4">
          <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
          <div className="bg-gray-300 h-8 w-3/4 rounded"></div>
          <div className="bg-gray-300 h-60 w-full rounded"></div>
          <div className="bg-gray-300 h-24 w-full rounded"></div>
        </div>

        {/* Skeleton for Related Posts */}
        <div className="article-right mt-8">
          <h2 className="bg-gray-300 h-6 w-32 rounded"></h2>
          <ul className="aside__newsArticle space-y-3 mt-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <li key={index} className="space-y-2">
                <div className="bg-gray-300 h-4 w-1/3 rounded"></div>
                <div className="bg-gray-300 h-5 w-2/3 rounded"></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="container m-auto article-container">
      <div className="post-detail mt-10">
        <div className="post-date">{post.publishedAt}</div>
        <div className="title__past-inner">{post.title}</div>
        <img src={post.image} alt={post.title} className="w-full h-60 object-cover rounded-md" />
        <div className="post-content">{post.content}</div>
      </div>

      {/* ✅ Read More Section */}
      <div className="article-right mt-8">
        <h2>Read More</h2>
        <ul className="aside__newsArticle">
          {relatedPosts.map((news) => (
            <li key={news.id}>
              <div className="date_nm">Date - {news.publishedAt}</div>
              <Link href={`/post/${news.id}`}>
                <div className="news_title">{news.title}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostDetail;
