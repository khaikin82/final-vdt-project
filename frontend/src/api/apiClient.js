import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:18080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: tự động thêm Authorization header nếu token tồn tại
apiClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("jwtToken");
    if (token && token !== "undefined") {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor: trả về response.data hoặc trả lỗi
apiClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    // Có thể thêm xử lý lỗi tập trung ở đây (vd: logout khi 401)
    return Promise.reject(error);
  }
);

export default apiClient;
