export const handleSubmitLogin = async ({ setError, formData, login }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Login Failed");
    }
    const data = await response.json();
    login(data.token, data.user);
  } catch (error) {
    setError(error.message);
  }
};
