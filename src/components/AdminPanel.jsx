import { useState, useEffect } from "react";
import { fetchPosts } from "../utils/AdminPanel/fetchAdminPosts";
import LoadingSpinner from "./Reusable/LoadingSpinner";
import ErrorMessage from "./Reusable/ErrorMessage";
import { Link } from "react-router-dom";
import { publishToggle } from "../utils/AdminPanel/publishToggle";
import PostsTopBar from "./PostsTopBar";
import deletePost from "../utils/BlogPost/deletePost";

export const AdminPanel = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState("desc?option=all");

  const refetchPosts = async () => {
    try {
      const data = await fetchPosts(order);
      setPosts(data);
    } catch (error) {
      setError(error.message || String(error));
      throw new Error(error.message || error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetchPosts();
  }, [order]);

  const handleDeletePost = async (postId) => {
    try {
      setIsLoading(true);
      await deletePost(postId);
      const data = await fetchPosts(order);
      setPosts(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <PostsTopBar setOrder={setOrder} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) =>
          post.published ? (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow  relative"
            >
              <div
                onClick={() => handleDeletePost(post.id)}
                className="absolute  top-0 right-1 cursor-pointer text-red-700 hover:scale-120 transition-transform"
              >
                x
              </div>
              <Link to={`/posts/${post.id}`} className="block cursor-pointer">
                <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
                <div
                  className=" text-gray-700 mb-4 line-clamp-2 overflow-hidden "
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>
                <span className="text-blue-500 mt-4 inline-block">
                  Read more →
                </span>
              </Link>
              <button
                onClick={() => publishToggle(post.id, setError, setPosts)}
                className="absolute top-1 right-6 text-xs bg-green-900 text-white px-1 rounded-full cursor-pointer"
              >
                Published
              </button>
            </article>
          ) : (
            <article
              key={post.id}
              className="bg-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow  relative"
            >
              <div
                onClick={() => handleDeletePost(post.id)}
                className="absolute  top-0 right-1 cursor-pointer text-red-700 hover:scale-120 transition-transform"
              >
                x
              </div>
              <Link to={`/posts/${post.id}`} className="block cursor-pointer">
                <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
                <div
                  className="text-gray-700 mb-4 line-clamp-2 overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>
                <span className="text-blue-500 mt-4 inline-block">
                  Read more →
                </span>
              </Link>
              <button
                onClick={() => publishToggle(post.id, setError, setPosts)}
                className="absolute top-1 right-6 text-xs bg-red-900 text-white px-1 rounded-full cursor-pointer"
              >
                Unpublished
              </button>
            </article>
          )
        )}
      </div>
    </>
  );
};
