const fetchAdminList = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/admin/users`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message || err);
  }
};
export default fetchAdminList;
