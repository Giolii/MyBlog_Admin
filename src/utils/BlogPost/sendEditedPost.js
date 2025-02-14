const sendEditedPost = async (postId, postData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      }
    );
    if (!response.ok) throw new Error("Error sending an edited post");
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};
export default sendEditedPost;
