const submitComment = async (postId, formData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/comments/${postId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Error posting comment");
    }
    const data = await response.json();
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default submitComment;
