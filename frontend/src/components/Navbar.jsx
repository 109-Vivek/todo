import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Todo App
        </Link>
        <ul className="flex space-x-4">
          <li>
            {location.pathname !== "/dashboard" && (
              <Link to="/signup" className="hover:text-gray-300">
                Sign Up
              </Link>
            )}
          </li>
          <li>
            {location.pathname !== "/dashboard" && (
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
            )}
          </li>
          <li>
            {location.pathname === "/dashboard" && (
              <Link
                onClick={() => localStorage.removeItem("token")}
                to="/"
                className="hover:text-gray-300"
              >
                Log out
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
