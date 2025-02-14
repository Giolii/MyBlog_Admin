const fetchPost = async ({ setPost, setUser, setIsLoading, setError, id }) => {
  setIsLoading(true);
  try {
    //   Fetch Post and User details
    const postResponse = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/posts/${id}`
    );
    if (!postResponse.ok) throw new Error("Failed to fetch posts");
    const postData = await postResponse.json();
    setPost(postData);
    setUser(postData.user);
    setIsLoading(false);
  } catch (error) {
    setError(error.message);
    setIsLoading(false);
  }
};

export default fetchPost;
