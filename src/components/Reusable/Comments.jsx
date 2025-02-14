import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import { useAuth } from "../../contexts/useAuth";
import timeAgo from "../../utils/Everyone/timeAgo";
import fetchComments from "../../utils/Comments/fetchComments";
import deleteComment from "../../utils/Comments/deleteComments";
import updateComment from "../../utils/Comments/updateComments";
import { ReplyComment } from "./ReplyComments";

const Comments = ({ postId }) => {
  const [editCommentId, setEditCommentId] = useState(null);
  const [commentData, setCommentData] = useState({ title: "", content: "" });
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      const data = await fetchComments({ postId });
      setComments(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw new Error(error);
    }
  };

  const handleUpdateComment = async (commentId) => {
    try {
      await updateComment(commentId, commentData, setEditCommentId);
      const data = await fetchComments({ postId });
      setComments(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleChange = (e) => {
    setCommentData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditClick = (commentId, title, content) => {
    setEditCommentId(commentId);
    setCommentData({ title: title, content: content });
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        setIsLoading(true);
        const data = await fetchComments({ postId });
        setComments(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getComments();
  }, [postId]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (comments.length === 0)
    return (
      <>
        <div className="text-center text-2xl ">No comments yet</div>
        <ReplyComment postId={postId} setComments={setComments} />
      </>
    );
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 rounded-lg p-6 relative">
            <div
              onClick={() => handleDeleteComment(comment.id)}
              className="absolute top-2 right-2 cursor-pointer text-red-700 hover:scale-120 transition-transform"
            >
              x
            </div>
            <div
              onClick={() =>
                handleEditClick(comment.id, comment.title, comment.content)
              }
              className="absolute top-2 right-8 cursor-pointer hover:scale-120 transition-transform"
            >
              ✏️
            </div>
            {editCommentId === comment.id ? (
              <div className="flex flex-col space-y-2.5">
                <h2 className="font-bold">Edit comment:</h2>
                <h3>Title:</h3>
                <input
                  name="title"
                  onChange={handleChange}
                  type="text"
                  value={commentData.title}
                  className="border rounded-md p-0.5"
                />
                <h3>Comment:</h3>
                <textarea
                  name="content"
                  onChange={handleChange}
                  type="text"
                  value={commentData.content}
                  className="border rounded-md p-0.5"
                />
                <div className="flex self-center gap-5">
                  <div
                    onClick={() => handleUpdateComment(comment.id)}
                    className="border px-1 rounded-md cursor-pointer"
                  >
                    Save
                  </div>
                  <div
                    onClick={() => setEditCommentId(null)}
                    className="border px-1 rounded-md cursor-pointer"
                  >
                    Cancel
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-semibold mb-2">{comment.title}</h3>
                <p className="text-gray-600 mb-2">{comment.user.username}</p>
                <p className="text-gray-800">{comment.content}</p>
                <p className="text-gray-400 absolute bottom-1 right-1">
                  {timeAgo(comment.createdAt)}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
      <ReplyComment postId={postId} setComments={setComments} />
    </div>
  );
};

export default Comments;
