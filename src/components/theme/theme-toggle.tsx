import { useTheme } from "@/components/theme/theme-provider"; // Ajusta la ruta a tu ThemeProvider
import { SunIcon, MoonIcon } from "lucide-react"; // Asumiendo que usas lucide-react para los iconos
import { Button } from "@/components/ui/button"; // Asumiendo que usas shadcn/ui Button

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Alternar tema">
      {theme === "dark" ? (
        <SunIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
        <MoonIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
      )}
    </Button>
  );
}