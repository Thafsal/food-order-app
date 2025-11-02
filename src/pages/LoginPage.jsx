import React from "react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-3xl font-semibold mb-6">Login</h1>
      <form className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md w-80 space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md bg-gray-100 dark:bg-slate-700"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded-md bg-gray-100 dark:bg-slate-700"
        />
        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
}
