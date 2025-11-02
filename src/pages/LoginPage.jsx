import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../utils/storage";

export default function LoginPage() {
  const [users, setUsers] = useLocalStorage("users", []);
  const [loggedInUser, setLoggedInUser] = useLocalStorage("loggedInUser", null);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const adminCredentials = { email: "admin@foodaura.com", password: "admin123" };

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Admin login
    if (form.email === adminCredentials.email && form.password === adminCredentials.password) {
      setLoggedInUser({ name: "Admin", role: "admin" });
      alert("Welcome Admin!");
      navigate("/");
      return;
    }

    if (isLogin) {
      // Normal user login
      const user = users.find((u) => u.email === form.email && u.password === form.password);
      if (user) {
        setLoggedInUser(user);
        alert(`Welcome back, ${user.name}!`);
        navigate("/");
      } else {
        setError("Invalid credentials or user not found!");
      }
    } else {
      // Signup
      if (!form.email || !form.password || !form.name) {
        setError("Please fill all fields!");
        return;
      }
      const exists = users.find((u) => u.email === form.email);
      if (exists) {
        setError("User already exists. Try logging in.");
        return;
      }

      const newUser = { name: form.name, email: form.email, password: form.password };
      setUsers([...users, newUser]);
      alert("Signup successful! Please login now.");
      setIsLogin(true);
    }

    setForm({ email: "", password: "", name: "" });
  }

  function handleLogout() {
    setLoggedInUser(null);
  }

  // Admin dashboard
  if (loggedInUser?.role === "admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <h1 className="text-3xl font-semibold mb-4 text-orange-600">Admin Panel</h1>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md w-96 space-y-3">
          <p>Total Registered Users: {users.length}</p>
          <ul className="text-sm list-disc ml-5">
            {users.map((u, i) => (
              <li key={i}>
                {u.name} ({u.email})
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 text-white py-2 px-4 rounded-md"
        >
          Logout
        </button>
      </div>
    );
  }

  // Normal user dashboard
  if (loggedInUser && loggedInUser.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome, {loggedInUser.name}!
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded-md"
        >
          Logout
        </button>
      </div>
    );
  }

  // Login / Signup form
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <h1 className="text-3xl font-semibold mb-6">
        {isLogin ? "Login to FoodAura" : "Signup for FoodAura"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md w-80 space-y-4"
      >
        {!isLogin && (
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-gray-100 dark:bg-slate-700"
          />
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-md bg-gray-100 dark:bg-slate-700"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded-md bg-gray-100 dark:bg-slate-700"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded-md"
        >
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        {isLogin ? (
          <>
            Don’t have an account?{" "}
            <button
              onClick={() => setIsLogin(false)}
              className="text-orange-600 underline"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              onClick={() => setIsLogin(true)}
              className="text-orange-600 underline"
            >
              Login
            </button>
          </>
        )}
      </p>
    </div>
  );
}
