import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../auth/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Bell, LogOut, Search, User } from "lucide-react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ThemeToggle } from "../theme/theme-toggle";
import { Input } from "../ui/input";
import { NewProjectDialog } from "@/components/modal/NewProjectDialog";

export function AppHeader() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = () => {
    signOut();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
  };

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Search bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              placeholder="Buscar proyectos, tareas, notas ..."
              className="w-full pl-10 pr-4 bg-muted/50 border-border hover:bg-muted transition-colors duration-200"
            />
          </div>
        </div>
        {/* Right side actions */}
        <div className="flex items-center gap-3 ml-6">
          {/* Quick add button */}
          <NewProjectDialog />

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Notificaciones */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative hover:bg-muted transition-colors duration-200"
              >
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-destructive text-destructive-foreground">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 bg-background border border-border shadow-medium"
            >
              <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start space-y-1 p-3">
                <div className="font-medium">
                  Tarea "Website redesign" pendiente
                </div>
                <div className="text-sm text-muted-foreground">
                  Vence en 2 horas
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start space-y-1 p-3">
                <div className="font-medium">
                  Nuevo comentario en "Aplicación móvil"
                </div>
                <div className="text-sm text-muted-foreground">
                  Hace 5 minutos
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start space-y-1 p-3">
                <div className="font-medium">Recordatorio de hábito diario</div>
                <div className="text-sm text-muted-foreground">
                  !Hora de hacer ejercicio!
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full hover:bg-muted transition-colors duration-200"
              >
                <Avatar className="h-9 w-9 ">
                  <AvatarImage
                    src="/avatars/02.png"
                    alt="User"
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    MD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-56 bg-background border border-border shadow-medium"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name || "Usuario"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>Configuración</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-destructive "
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
