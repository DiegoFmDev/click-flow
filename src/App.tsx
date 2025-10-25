import "./App.css";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, useAuth } from "./components/auth/AuthProvider";
import Login from "./pages/Login";
import { AppLayout } from "./components/layout/AppLayout";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import { ThemeToggle } from "./components/theme/theme-toggle";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#3b82f6]">
        Loading...
      </div>
    );
  }
  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Projects />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="momentum-ui-theme">
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
