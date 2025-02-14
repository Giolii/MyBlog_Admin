import { useAuth } from "../contexts/useAuth";
import { Login } from "./Login";
import { AdminPanel } from "./AdminPanel";
import ErrorMessage from "./Reusable/ErrorMessage";

export const Home = () => {
  const { user } = useAuth();

  return (
    <>
      {user && user.admin && <AdminPanel />}
      {user && !user.admin && (
        <ErrorMessage message="You are not authorized, please Login with an admin account" />
      )}
      {!user && <Login />}
    </>
  );
};
