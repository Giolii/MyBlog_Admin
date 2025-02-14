import { sanitize, sanitizeTitle } from "../BlogPost/sanitize";

const sendNewPost = async (formData) => {
  const formDataSanitized = {
    title: sanitizeTitle(formData.title),
    content: sanitize(formData.content),
  };

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formDataSanitized),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data.error || data.message || "Error submitting new post"
      );
    }
    return true;
  } catch (error) {
    console.error("Error creating post:", error.message);
    throw error;
  }
};

export default sendNewPost;
