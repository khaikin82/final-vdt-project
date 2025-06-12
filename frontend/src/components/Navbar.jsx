import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/viettel_logo.jpg"; // đường dẫn logo

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLogoClick = () => {
    if (!user) {
      navigate("/"); // hoặc redirect đến /login nếu bạn muốn
      return;
    }

    switch (user.role) {
      case "ADMIN":
        navigate("/admin");
        break;
      case "CUSTOMER":
        navigate("/customer");
        break;
      case "DELIVERY_STAFF":
        navigate("/delivery");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <nav className="bg-white shadow mb-6">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <button
          onClick={handleLogoClick}
          className="flex items-center space-x-3 text-xl font-bold text-gray-700 hover:text-blue-600 transition cursor-pointer"
        >
          <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
          <span>Order & Delivery System</span>
        </button>

        <div className="space-x-3">
          <Link
            to="/order-lookup"
            className="px-4 py-2 rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 transition"
          >
            Tra cứu đơn hàng
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition cursor-pointer"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg text-white bg-green-500 hover:bg-green-600 transition cursor-pointer"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
