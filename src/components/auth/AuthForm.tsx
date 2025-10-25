import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Eye, EyeOff, Info, Lock, Mail } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = signIn(formData.email, formData.password);

    if (success) {
      toast({
        title: "!Bienvenido",
        description: "Has iniciado sesión correctamente",
      });
      navigate("/");
    } else {
      toast({
        title: "Error",
        description: "Credenciales incorrectas",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <Card className="w-full max-w-md shadow-large">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">ClickFlow</CardTitle>
          <CardDescription>
            Bienvenido a tu espacio de productividad
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert>
            <Info className="h-4 w-4"/>
            <AlertDescription>
              <strong>Credenciales de prueba:</strong>
              <br />
              password: admin@admin.com
              <br />
              Contraseña: admin123
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electronico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"/>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@admin.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"/>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="admin123"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                </Button>
              </div>
            </div>
            <Button
                type="submit"
                className="w-full bg-gradient-primary hover:opacity-90"
                disabled={
                    isLoading
                }
            >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
