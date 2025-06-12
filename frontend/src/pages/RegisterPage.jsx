// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authAPI from "../api/authApi";

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    // Kiểm tra password trùng nhau
    if (password !== confirmPassword) {
      setError("Password và Nhập lại password không khớp.");
      return;
    }

    setLoading(true);
    try {
      console.log(role);
      const roleUpperCase = role.toUpperCase();
      const registerRequest = {
        username,
        password,
        fullName,
        email,
        role: roleUpperCase,
      };
      const newJwtToken = await authAPI.register(registerRequest);
      console.log(newJwtToken);

      alert("Registered successfully. Please login.");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-6">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow-md w-108"
      >
        <h2 className="text-2xl mb-6 text-center font-bold">Register</h2>

        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

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

        <div className="mb-4">
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

        <div className="mb-6">
          <label className="block mb-1">Nhập lại Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Role</label>
          <select
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={loading}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="delivery_staff">Delivery Staff</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white transition ${
            loading
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
