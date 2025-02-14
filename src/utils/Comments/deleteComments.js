const deleteComment = async (commentId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) throw new Error("Error deleting comment");
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default deleteComment;
