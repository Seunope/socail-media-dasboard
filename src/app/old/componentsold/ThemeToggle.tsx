import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

export default function ThemeToggle({
  darkMode,
  setDarkMode,
}: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`p-2 rounded-full focus:outline-none ${
        darkMode ? "bg-gray-700 text-yellow-300" : "bg-gray-200 text-gray-700"
      }`}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  );
}
