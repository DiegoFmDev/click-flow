import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "../ui/sidebar";

import {
  Book,
  Calendar,
  CheckSquare,
  ChevronLeft,
  FileText,
  FolderOpen,
  Layout,
  LayoutDashboard,
  Plug,
  Settings,
  StickyNote,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

const navigationItems = [
  { title: "Panel", url: "/", icon: LayoutDashboard, group: "main" },
  { title: "Proyectos", url: "/projects", icon: FolderOpen, group: "main" },
  { title: "Tareas", url: "/tasks", icon: CheckSquare, group: "main" },
  { title: "Hábitos", url: "/habits", icon: Target, group: "main" },
  { title: "Notas", url: "/notes", icon: StickyNote, group: "main" },
  { title: "Calendario", url: "/calendar", icon: Calendar, group: "main" },
  { title: "Archivos", url: "/files", icon: FileText, group: "main" },
];

const advancedItems = [
  {
    title: "Analíticas",
    url: "/analytics",
    icon: TrendingUp,
    group: "advanced",
  },
  { title: "Equipo", url: "/team", icon: Users, group: "advanced" },
  { title: "Plantillas", url: "/templates", icon: Layout, group: "advanced" },
  {
    title: "Integraciones",
    url: "/integrations",
    icon: Plug,
    group: "advanced",
  },
  {
    title: "Documentación",
    url: "/documentation",
    icon: Book,
    group: "advanced",
  },
];

const settingsItems = [
  {
    title: "Configuración",
    url: "/settings",
    icon: Settings,
    group: "settings",
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <Sidebar
      className="border-r border-sidebar-border bg-sidebar shadow-soft "
      collapsible="icon"
    >
      <SidebarContent className="p-2">
        {/* Logo section */}
        <div
          className={`flex items-center gap-3 px-3 py-4 mb-2 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow"><span className="text-primary-foreground font-bold text-sm">C</span></div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-semibold text-sidebar-foreground">
                Click Flow
              </span>
              <span className="text-xs text-muted-foreground">
                Área de trabajo
              </span>
            </div>
          )}
        </div>

        {/* Main navigation */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-3 py-2">
              Principal
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`w-full justify-start rounded-lg transition-all duration-200 ${
                      isCollapsed ? "px-2" : "px-3"
                    }
                  ${
                    isActive(item.url)
                      ? "bg-gradient-primary text-primary-foreground shadow-glow"
                      : "hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground"
                  }`}
                  >
                    <NavLink to={item.url} className="flex items-center gap-3 w-full">
                      <item.icon
                        className={`${
                          isCollapsed ? "w-5 h-5" : "w-4 h-4"
                        } flex-shrink-0`}
                      />
                      {!isCollapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Advanced Features */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-3 py-2">
              Avanzado
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {advancedItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`
                      w-full justify-start rounded-lg transition-all duration-200
                      ${isCollapsed ? "px-2" : "px-3"}
                      ${
                        isActive(item.url)
                          ? "bg-gradient-primary text-primary-foreground shadow-glow"
                          : "hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground"
                      }
                    `}
                  >
                    <NavLink to={item.url} className="flex items-center gap-3 w-full">
                      <item.icon
                        className={`${
                          isCollapsed ? "w-5 h-5" : "w-4 h-4"
                        } flex-shrink-0`}
                      />
                      {!isCollapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={`
                      w-full justify-start rounded-lg transition-all duration-200
                      ${isCollapsed ? "px-2" : "px-3"}
                      ${isActive(item.url) 
                        ? "bg-gradient-primary text-primary-foreground shadow-glow" 
                        : "hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground"
                      }
                    `}
                  >
                    <NavLink to={item.url} className="flex items-center gap-3 w-full">
                      <item.icon className={`${isCollapsed ? "w-5 h-5" : "w-4 h-4"} flex-shrink-0`} />
                      {!isCollapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
              {/* Collapse button */}
              <div className={`mt-auto p-2 ${isCollapsed ? "flex justify-center" : ""}`}>
                <SidebarTrigger className={`${isCollapsed ? "w-10 h-10 p-0":"w-full justify-start"}
                hover:bg-sidebar-accent transition-colors duration-200`}>
                    <div className="flex items-center gap-2">
                        <ChevronLeft className={`h-4 w-4 transition-transform duration-200 ${isCollapsed ? "rotate-180" : ""}`}/>
                        {!isCollapsed && <span className="ml-2">Colapsar</span>}
                    </div>
                </SidebarTrigger>
              </div>
      </SidebarContent>
    </Sidebar>
  );
}
