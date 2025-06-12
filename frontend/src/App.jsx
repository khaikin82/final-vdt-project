// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import DeliveryStaffDashboard from "./pages/DeliveryStaffDashboard";
import { AuthProvider } from "./context/AuthContext"; // <== thêm dòng này
import OrderLookupPage from "./pages/OrderLookupPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            {/* <Route path="/" element={<OrderLookupPage />} /> */}
            <Route path="/" element={<Navigate to="/order-lookup" />} />
            <Route path="/order-lookup" element={<OrderLookupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/customer" element={<CustomerDashboard />} />
            <Route path="/delivery" element={<DeliveryStaffDashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
