"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
} from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((newTheme: "light" | "dark") => {
    const root = document.documentElement;

    // Remove existing theme classes
    root.classList.remove("dark", "light");

    // Apply new theme
    root.classList.add(newTheme);
    root.setAttribute("data-theme", newTheme);
    root.style.colorScheme = newTheme;

    // Store in localStorage
    try {
      localStorage.setItem("theme", newTheme);
    } catch (error) {
      console.warn("Could not save theme to localStorage:", error);
    }
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    // Get the current theme from the DOM (set by the initialization script)
    const currentThemeClass = document.documentElement.classList.contains(
      "dark"
    )
      ? "dark"
      : "light";

    let savedTheme: "light" | "dark" | null = null;

    try {
      savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    } catch (error) {
      console.warn("Could not access localStorage:", error);
    }

    // Use the current DOM state or fallback to saved theme or system preference
    const initialTheme =
      currentThemeClass ||
      savedTheme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    setTheme(initialTheme);

    // Only apply if different from current DOM state
    if (initialTheme !== currentThemeClass) {
      applyTheme(initialTheme);
    }

    setMounted(true);
  }, [applyTheme]);

  const toggleTheme = useCallback(() => {
    if (!mounted) return;

    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
  }, [theme, mounted, applyTheme]);

  const value = { theme, toggleTheme, mounted };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
