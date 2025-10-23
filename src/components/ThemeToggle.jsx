import React from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-3 py-1 rounded bg-gray-100 dark:bg-slate-700 text-sm"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
