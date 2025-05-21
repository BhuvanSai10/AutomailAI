import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const currentPath = location.pathname;

  return (
    <nav className="bg-gray-900/90 backdrop-blur-md py-4 px-6 border-b border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center cursor-pointer">
        <span
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-white cursor-pointer hover:text-purple-400 cursor-pointer"
        >
          AutoMailAI
        </span>
        <div className="flex items-center gap-4 cursor-pointer">
          {user && currentPath !== "/email-generator" && (
            <button
              onClick={() => navigate("/email-generator")}
              className="text-white hover:text-blue-400 px-4 py-2 rounded-md transition cursor-pointer"
            >
              Generate Email
            </button>
          )}
          {user && currentPath !== "/dashboard" && (
            <button
              onClick={() => navigate("/dashboard")}
              className="text-white hover:text-blue-400 px-4 py-2 rounded-md transition cursor-pointer"
            >
              Dashboard
            </button>
          )}
          {!user && currentPath !== "/login" && (
            <button
              onClick={() => navigate("/login")}
              className="text-white hover:text-blue-400 px-4 py-2 rounded-md transition cursor-pointer"
            >
              Login
            </button>
          )}
          {user && (
            <>
              <span className="text-gray-300 italic">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="text-white hover:text-red-400 px-4 py-2 rounded-md transition cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
