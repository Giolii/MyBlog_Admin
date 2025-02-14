import { useAuth } from "../contexts/useAuth";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/guest`
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login Failed");
      }
      const data = await response.json();
      login(data.token, data.user);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex justify-between  p-4 max-[300px]:flex-col items-center ">
      <Link
        className=" text-3xl font-bold  flex items-center cursor-pointer hover:text-gray-700 "
        to={"/"}
      >
        Blog Admin
      </Link>
      <div className="flex gap-2 flex-wrap">
        {user ? (
          <div className="flex gap-4">
            <Link className="text-white bg-blue-900 hover:bg-blue-950 rounded-full text-sm  px-4 py-2 cursor-pointer flex items-center ">
              {user.username}
            </Link>
            <Link
              onClick={logout}
              className="text-white bg-blue-900 hover:bg-blue-950 rounded-full text-sm px-4 py-2 cursor-pointer flex items-center "
            >
              Logout
            </Link>
          </div>
        ) : (
          <>
            <Link
              to={"/"}
              className="text-white bg-blue-500 hover:bg-blue-700 rounded-full text-sm text-center px-4 py-2 cursor-pointer "
            >
              Login
            </Link>
            <Link
              onClick={() => handleSubmit()}
              className="text-white bg-blue-500 hover:bg-blue-700 rounded-full text-sm text-center px-4 py-2 cursor-pointer"
            >
              Guest mode
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
