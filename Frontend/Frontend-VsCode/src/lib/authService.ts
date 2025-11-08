import API from "./api";

// Register new user
export const registerUser = async (userData: any) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

// Login and store token
export const loginUser = async (credentials: any) => {
  const response = await API.post("/auth/login", credentials);
  localStorage.setItem("token", response.data.token);
  return response.data;
};

// Get user profile
export const getUserProfile = async (username: string) => {
  const response = await API.get(`/auth/profile/${username}`);
  return response.data;
};

// Update user profile
export const updateUser = async (username: string, data: any) => {
  const response = await API.put(`/auth/update/${username}`, data);
  return response.data;
};
