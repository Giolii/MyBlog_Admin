export const publishToggle = async (postId, setError, setPosts) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/togglePublish`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, published: !post.published } : post
      )
    );
  } catch (err) {
    setError(err.message);
    console.error(err.message);
  }
};
