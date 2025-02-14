const updateComment = async (commentId, commentData, setEditCommentId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/comments/${commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(commentData),
      }
    );
    if (!response.ok) throw new Error("Error updating comment!");
    setEditCommentId(null);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default updateComment;
