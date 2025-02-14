import { useEffect, useState } from "react";
import fetchAdminList from "../utils/AdminSettings/fetchAdminList";
import LoadingSpinner from "./Reusable/LoadingSpinner";
import ErrorMessage from "./Reusable/ErrorMessage";
import { Link } from "react-router-dom";
import ToggleButton from "./Reusable/Toggle";

const AdminSettings = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        const userData = await fetchAdminList();
        setUsers(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, []);

  if (error) return <ErrorMessage message={error} />;
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl mx-auto container px-2 py-1 flex flex-col gap-2 ">
      <Link to="/" className="text-blue-500 mb-6 inline-block">
        ← Back to Posts
      </Link>
      <div className="flex justify-between  border-gray-300 px-2 py-1 rounded-full  items-center ">
        <div className=" border-gray-300 border-b-2 px-2  rounded">
          Username:
        </div>
        <div className=" border-gray-300 border-b-2 px-2  rounded">Admin:</div>
      </div>
      {users.map((user) => (
        <div
          key={user.id}
          className="flex justify-between border border-gray-300 px-2 py-1 rounded-full  items-center shadow-md"
        >
          <div>{user.username}</div>
          <ToggleButton user={user} />
        </div>
      ))}
    </div>
  );
};

export default AdminSettings;
