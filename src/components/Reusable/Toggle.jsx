import React, { useState } from "react";
import { Loader2 } from "lucide-react";

const ToggleButton = ({ user }) => {
  const [isToggled, setIsToggled] = useState(user.admin);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleToggle = async () => {
    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admin/toggleStatus/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Server request failed");
      }

      setIsToggled(!isToggled);
    } catch (err) {
      setError("Failed to update status");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={`
                    relative w-16 h-8 rounded-full transition-colors duration-300
                    ${isToggled ? "bg-blue-600" : "bg-gray-200"}
                    ${
                      isLoading
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }
                `}
        aria-label="Toggle Button"
      >
        <div
          className={`
                        absolute top-1 left-1
                         w-6 h-6 bg-white rounded-full shadow transition-transform duration-300
                        ${isToggled ? "translate-x-8" : "translate-x-0"}
                    `}
        >
          {isLoading && (
            <Loader2 className="w-4 h-4 absolute top-1 left-1 animate-spin text-blue-600" />
          )}
        </div>
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
export default ToggleButton;
