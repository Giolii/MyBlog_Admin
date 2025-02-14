const fetchComments = async ({ postId }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/comments`
    );

    if (!response.ok) throw new Error("Failed to fetch comments");

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export default fetchComments;
