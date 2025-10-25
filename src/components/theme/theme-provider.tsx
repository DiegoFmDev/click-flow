import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "momentum-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme;
    if (storedTheme) {
      return storedTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    let themeToApply: "light" | "dark";
    if (currentTheme === "system") {
      themeToApply = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      themeToApply = currentTheme;
    }
    root.classList.add(themeToApply);
  }, [currentTheme, storageKey]);

  const setTheme = (newTheme: "light" | "dark") => {
    setCurrentTheme(newTheme);
    localStorage.setItem(storageKey, newTheme);
  };

  const exposedTheme = (
    currentTheme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : currentTheme
  ) as "light" | "dark";

  const value = {
    theme: exposedTheme,
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("UseTheme debe ser usado dentro de un ThemeProvider");

  return context;
};
