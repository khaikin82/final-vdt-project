import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authAPI from "../api/authApi";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ gọi 1 lần duy nhất

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const loginRequest = { username, password };
      const user = await authAPI.login(loginRequest);

      if (!user) {
        setError("Login failed: user data missing");
        setLoading(false);
        return;
      }

      login(user); // ✅ set vào context

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
          setError("Unknown user role");
          break;
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-35">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl mb-6 text-center font-bold">Login</h2>
        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white transition ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
