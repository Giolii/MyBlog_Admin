const deletePost = async (postId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) throw new Error("Error updating admin status");
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default deletePost;
