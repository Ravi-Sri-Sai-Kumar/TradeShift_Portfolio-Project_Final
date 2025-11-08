import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../lib/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { username, password });
      const token = res.data.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-card rounded shadow-md flex flex-col gap-4 w-full max-w-xs"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <input
          type="email"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Email"
          className="border p-2 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white rounded py-2 font-semibold">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
