import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Clock,
  Filter,
  Flag,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";
import { useState } from "react";

const Tasks = () => {
  const { toast } = useToast();
  const [columns, setColumns] = useState({
    todo: [
      {
        id: 1,
        title: "Diseñar boceto de la página principal",
        description:
          "Crear wireframes y diseños para la nueva página de inicio",
        priority: "high",
        dueDate: "12 Dic",
        assignee: { name: "Sarah Wilson", initials: "SW" },
        project: "Rediseño del sitio web",
        tags: ["Diseño", "UI/UX"],
      },
      {
        id: 2,
        title: "Planificar integración de API",
        description: "Definir estrategia de integración con APIs de terceros",
        priority: "medium",
        dueDate: "15 Dic",
        assignee: { name: "Mike Johnson", initials: "MJ" },
        project: "Aplicación móvil",
        tags: ["Backend", "API"],
      },
      {
        id: 3,
        title: "Revisar estrategia de contenido",
        description:
          "Actualizar la estrategia de contenido para el primer trimestre",
        priority: "low",
        dueDate: "20 Dic",
        assignee: { name: "Emma Brown", initials: "EB" },
        project: "Campaña de marketing",
        tags: ["Contenido", "Estrategia"],
      },
    ],
    inProgress: [
      {
        id: 4,
        title: "Implementar autenticación de usuarios",
        description: "Configurar sistema de inicio de sesión y registro seguro",
        priority: "high",
        dueDate: "10 Dic",
        assignee: { name: "Alex Chen", initials: "AC" },
        project: "Aplicación móvil",
        tags: ["Desarrollo", "Seguridad"],
      },
      {
        id: 5,
        title: "Definir paleta de colores de marca",
        description: "Finalizar los colores y crear guía de estilo",
        priority: "medium",
        dueDate: "8 Dic",
        assignee: { name: "Lucas Taylor", initials: "LT" },
        project: "Guía de marca",
        tags: ["Diseño", "Branding"],
      },
    ],
    done: [
      {
        id: 6,
        title: "Análisis de competidores",
        description: "Completar estudio de principales competidores",
        priority: "medium",
        dueDate: "5 Dic",
        assignee: { name: "Sophie Davis", initials: "SD" },
        project: "Campaña de marketing",
        tags: ["Investigación", "Análisis"],
      },
      {
        id: 7,
        title: "Configurar entorno de desarrollo",
        description: "Preparar entornos locales y de pruebas",
        priority: "high",
        dueDate: "1 Dic",
        assignee: { name: "David Kim", initials: "DK" },
        project: "Aplicación móvil",
        tags: ["DevOps", "Configuración"],
      },
      {
        id: 8,
        title: "Diseños de logotipo",
        description: "Crear conceptos iniciales del logotipo",
        priority: "medium",
        dueDate: "28 Nov",
        assignee: { name: "Emma Brown", initials: "EB" },
        project: "Guía de marca",
        tags: ["Diseño", "Logo"],
      },
    ],
  });

  const handleNewTask = () => {
    toast({
      title: "Nueva Tarea",
      description: "Abriendo formulario de creación...",
    });
  };

  const handleEditTask = (taskId: number, taskTitle: string) => {
    toast({
      title: "Editar Tarea",
      description: `Abriendo editor para "${taskTitle}"...`,
    });
    // Edit task functionality would go here
  };
  const handleDuplicateTask = (taskId: number, taskTitle: string) => {
    toast({
      title: "Tarea duplicada",
      description: `"${taskTitle}" fue duplicada correctamente.`,
    });
    // Duplicate task functionality would go here
  };

  const handleDeleteTask = (taskId: number, taskTitle: string) => {
    toast({
      title: "Tarea eliminada",
      description: `"${taskTitle}" fue movida a la papelera.`,
      variant: "destructive",
    });

    // Delete task functionality would go here
  };

  const handleAddTaskToColumn = (columnKey: string) => {
    const columnName = columnTitles[columnKey as keyof typeof columnTitles];
    toast({
      title: "Agregar Tarea",
      description: `Creando nueva tarea en la columna "${columnName}"...`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-priority-high";
      case "medium":
        return "text-priority-medium";
      case "low":
        return "text-priority-low";
      default:
        return "text-muted-foreground";
    }
  };

  const getPriorityBg = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-priority-high/10";
      case "medium":
        return "bg-priority-medium/10";
      case "low":
        return "bg-priority-low/10";
      default:
        return "bg-muted";
    }
  };

  const TaskCard = ({ task }: { task: any }) => (
    <Card className="mb-3 hover:shadow-medium transition-all duration-200 cursor-pointer group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flag className={`w-3 h-3 ${getPriorityColor(task.priority)}`} />
            <Badge variant="outline" className="text-xs">
              {task.project}
            </Badge>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-background border border-border shadow-medium"
            >
              <DropdownMenuItem
                onClick={() => handleEditTask(task.id, task.title)}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDuplicateTask(task.id, task.title)}
              >
                Duplicar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteTask(task.id, task.title)}
                className="text-destructive focus:text-destructive"
              >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <h3 className="font-medium text-foreground mb-2">{task.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {task.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map((tag: string) => (
            <Badge className="text-xs" key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                {task.assignee.initials}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">
              {task.assignee.name}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {task.dueDate}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const columnTitles = {
    todo: "Por hacer",
    inProgress: "En progreso",
    done: "Completadas",
  };

  const columnColors = {
    todo: "border-muted",
    inProgress: "border-accent",
    done: "border-success",
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tareas</h1>
          <p className="text-muted-foreground mt-1">
            {" "}
            Organiza y haz seguimiento de tu trabajo con tableros Kanban
          </p>
        </div>
        <Button
          onClick={handleNewTask}
          className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nueva Tarea
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar Tareas..."
              className="pl-10 bg-muted/50 border-border"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(columns).map(([columnKey, tasks]) => (
          <div key={columnKey} className="-space-y-4">
            <Card
              className={`border-t-4 ${
                columnColors[columnKey as keyof typeof columnColors]
              }`}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg font-semibold">
                    {columnTitles[columnKey as keyof typeof columnTitles]}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {tasks.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3 min-h-[400px]">
                  {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}

                  {/* Add Task Button */}
                  <Button
                    variant="ghost"
                    className="w-full border-2 border-dashed border-muted-foreground/20 hover:border-muted-foreground/40 hover:bg-muted/50 transition-all duration-200"
                    onClick={() => handleAddTaskToColumn(columnKey)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar tarea
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
