import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar as CalendarIcon, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface NewProjectDialogProps {
  onProjectCreate?: (project: any) => void;
}
export function NewProjectDialog({ onProjectCreate }: NewProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [currentTag, setCurrentTag] = useState("");
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "",
    status: "Planning",
    tags: [] as string[],
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "El nombre del proeytco es requerido",
        variant: "destructive",
      });
      return;
    }
    const newProject = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      progress: 0,
      status: formData.status,
      priority: formData.priority || "medium",
      dueDate: date ? format(date, "MMM dd, yyyy") : "Sin fecha",
      team: [{ name: "You", avatar: "", initals: "DM" }],
      tags: formData.tags,
      taskCount: 0,
      completedTasks: 0,
      lastUpdate: "Just now",
      starred: false,
    };

    onProjectCreate?.(newProject);

    toast({
      title: "!Proyecto creado 🎉",
      description: `"${formData.name}" ha sido agregado a tus proyectos.`,
    });

    setFormData({
      name: "",
      description: "",
      priority: "",
      status: "Planning",
      tags: [],
    });
    setDate(undefined);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo proyecto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
          <DialogDescription>
            Inicia un nuevo proyecto para organizar tus tareas y colaborar con tu equipo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">Nombre del Proyecto *</Label>
            <Input
              id="project-name"
              placeholder="Ingresa el nombre del proyecto..."
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-description">Descripción</Label>
            <Textarea
              id="project-description"
              placeholder="Describe tu proyecto..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Prioridad</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleInputChange("priority", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baja</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Fecha Límite</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "MMM dd, yyyy") : "Elige una fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    showOutsideDays
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Etiquetas</Label>
            <div className="flex gap-2">
              <Input placeholder="Agrega una etiqueta..." value={currentTag} onChange={(e) => setCurrentTag(e.target.value)} onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}/>
              <Button type="button" variant="outline" onClick={handleAddTag}>
                <Plus className="w-4 h-4"/>
              </Button>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                    <Button type="button" variant="ghost" size="sm" className="h-auto p-0 ml-1 hover:bg-transparent"
                    onClick={() => handleRemoveTag(tag)}>
                      <X className="w-3 h-3"/>
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" className="bg-gradient-primary hover:opacity-90">Crear Proyecto</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
