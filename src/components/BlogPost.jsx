import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ErrorMessage from "./Reusable/ErrorMessage";
import fetchPost from "../utils/BlogPost/fetchPost.js";
import BlogSkeleton from "./Reusable/BlogSkeleton";
import Comments from "./Reusable/Comments";
import deletePost from "../utils/BlogPost/deletePost";
import MyEditor from "./Reusable/MyEditor";
import sendEditedPost from "../utils/BlogPost/sendEditedPost.js";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [editedPost, setEditedPost] = useState(post);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost({ setPost, setUser, setIsLoading, setError, id });
  }, [id]);

  const handleEdit = () => {
    console.log(post.content);
    setEditedPost(post);
    setIsEditing(true);
  };

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      navigate("/");
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleChange = (e) => {
    setEditedPost((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditorChange = (newContent) => {
    setEditedPost((prev) => ({
      ...prev,
      content: newContent,
    }));
  };

  const handleSendEditedPost = async () => {
    await sendEditedPost(id, editedPost);
    setIsEditing(false);
    fetchPost({ setPost, setUser, setIsLoading, setError, id });
  };

  if (isLoading) return <BlogSkeleton />;
  if (error) return <ErrorMessage message={error} />;
  return (
    <div>
      <Link to="/" className="text-blue-500 mb-6 inline-block">
        ← Back to Posts
      </Link>
      <article className="bg-white rounded-lg shadow-md p-8 mb-8 relative">
        {isEditing ? (
          <>
            <div
              onClick={() => handleSendEditedPost()}
              className="absolute  top-0 right-1 cursor-pointer text-red-700 hover:scale-120 transition-transform"
            >
              ✅
            </div>
            <div
              onClick={() => setIsEditing(false)}
              className="absolute top-0 right-8 cursor-pointer hover:scale-120 transition-transform"
            >
              🔙
            </div>
          </>
        ) : (
          <>
            <div
              onClick={() => handleDeletePost(post.id)}
              className="absolute  top-0 right-1 cursor-pointer text-red-700 hover:scale-120 transition-transform"
            >
              ❌
            </div>

            <div
              onClick={() => handleEdit()}
              className="absolute top-0 right-8 cursor-pointer hover:scale-120 transition-transform"
            >
              ✏️
            </div>
          </>
        )}
        {isEditing ? (
          <input
            type="text"
            name="title"
            className="text-3xl font-bold mb-4 border rounded-full px-2 py-1 w-full"
            value={editedPost.title}
            onChange={(e) => handleChange(e)}
          />
        ) : (
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        )}
        <div className="mb-6 text-gray-600">
          <p className="mb-2">Written by: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
        {isEditing ? (
          <MyEditor
            className="text-gray-800 leading-relaxed mb-8"
            value={editedPost.content}
            onChange={handleEditorChange}
          />
        ) : (
          <div
            className="prose max-w-none text-gray-800 leading-relaxed mb-8 "
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        )}
        <div className="border-t pt-8">
          <Comments postId={post.id} />
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
