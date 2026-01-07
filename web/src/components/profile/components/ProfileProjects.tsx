"use client";

import { useState } from "react";
import { Code, ExternalLink, Github, Calendar, Plus, Edit3, Trash2, X, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProfileUser } from "../types";
import { formatDate } from "../utils";
import Link from "next/link";
import { projectService } from "@/services/projectsService";
import { toast } from "sonner";
import { UserService } from "@/services/userService";

interface ProfileProjectsProps {
  user: ProfileUser;
  isEditable?: boolean;
  onUpdate?: (user: ProfileUser) => void;
}

export default function ProfileProjects({ user, isEditable = false, onUpdate }: ProfileProjectsProps) {
  const [projects, setProjects] = useState(user.projects || []);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "WEB" as "WEB" | "MOBILE" | "BACKEND" | "AI" | "DEVOPS" | "OTHER",
    tech: [] as string[],
    demo: "",
    github: "",
  });
  
  const [newTech, setNewTech] = useState("");
  const [editProject, setEditProject] = useState(newProject);

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "WEB":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "MOBILE":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "BACKEND":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "AI":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300";
      case "DEVOPS":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const handleAddTech = (techArray: string[], setTechArray: (tech: string[]) => void) => {
    if (newTech.trim() && !techArray.includes(newTech.trim())) {
      setTechArray([...techArray, newTech.trim()]);
      setNewTech("");
    }
  };

  const handleRemoveTech = (index: number, techArray: string[], setTechArray: (tech: string[]) => void) => {
    setTechArray(techArray.filter((_, i) => i !== index));
  };

  const handleCreate = async () => {
    if (!newProject.title.trim() || !newProject.description.trim()) {
      toast.error("Başlık ve açıklama gerekli");
      return;
    }

    setIsSaving(true);
    try {
      const response = await projectService.create({
        title: newProject.title,
        description: newProject.description,
        category: newProject.category,
        tech: newProject.tech,
        demo: newProject.demo || undefined,
        github: newProject.github || undefined,
      });

      if (response.success && response.data) {
        const updatedUser = await UserService.getMe();
        if (updatedUser && onUpdate) {
          onUpdate(updatedUser);
          setProjects(updatedUser.projects || []);
        }
        setIsAdding(false);
        setNewProject({
          title: "",
          description: "",
          category: "WEB",
          tech: [],
          demo: "",
          github: "",
        });
        toast.success("Proje eklendi");
      } else {
        toast.error("Proje eklenemedi");
      }
    } catch (error) {
      toast.error("Bir hata oluştu");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (project: typeof projects[0]) => {
    setEditProject({
      title: project.title,
      description: project.description,
      category: (project.category || "WEB") as typeof newProject.category,
      tech: project.tech || [],
      demo: project.demo || "",
      github: project.github || "",
    });
    setEditingId(project.id);
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    if (!editProject.title.trim() || !editProject.description.trim()) {
      toast.error("Başlık ve açıklama gerekli");
      return;
    }

    setIsSaving(true);
    try {
      const response = await projectService.update(editingId.toString(), {
        title: editProject.title,
        description: editProject.description,
        category: editProject.category,
        tech: editProject.tech,
        demo: editProject.demo || undefined,
        github: editProject.github || undefined,
      });

      if (response.success && response.data) {
        const updatedUser = await UserService.getMe();
        if (updatedUser && onUpdate) {
          onUpdate(updatedUser);
          setProjects(updatedUser.projects || []);
        }
        setEditingId(null);
        toast.success("Proje güncellendi");
      } else {
        toast.error("Proje güncellenemedi");
      }
    } catch (error) {
      toast.error("Bir hata oluştu");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Bu projeyi silmek istediğinize emin misiniz?")) return;

    setIsSaving(true);
    try {
      const response = await projectService.delete(id.toString());
      if (response.success) {
        const updatedUser = await UserService.getMe();
        if (updatedUser && onUpdate) {
          onUpdate(updatedUser);
          setProjects(updatedUser.projects || []);
        }
        toast.success("Proje silindi");
      } else {
        toast.error("Proje silinemedi");
      }
    } catch (error) {
      toast.error("Bir hata oluştu");
    } finally {
      setIsSaving(false);
    }
  };

  const renderProjectForm = (project: typeof newProject, setProject: typeof setNewProject, onSave: () => void, onCancel: () => void) => (
    <div className="p-4 rounded-lg border-2 border-dashed border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/10">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Başlık *</label>
            <Input
              value={project.title}
              onChange={(e) => setProject({ ...project, title: e.target.value })}
              placeholder="Proje başlığı"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Kategori *</label>
            <select
              className="w-full rounded-md border px-3 py-2 bg-background"
              value={project.category}
              onChange={(e) => setProject({ ...project, category: e.target.value as typeof project.category })}
            >
              <option value="WEB">Web</option>
              <option value="MOBILE">Mobil</option>
              <option value="BACKEND">Backend</option>
              <option value="AI">AI/ML</option>
              <option value="DEVOPS">DevOps</option>
              <option value="OTHER">Diğer</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Açıklama *</label>
          <Textarea
            value={project.description}
            onChange={(e) => setProject({ ...project, description: e.target.value })}
            placeholder="Proje açıklaması"
            rows={3}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">GitHub URL</label>
            <Input
              value={project.github}
              onChange={(e) => setProject({ ...project, github: e.target.value })}
              placeholder="https://github.com/..."
              type="url"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Demo URL</label>
            <Input
              value={project.demo}
              onChange={(e) => setProject({ ...project, demo: e.target.value })}
              placeholder="https://demo.com"
              type="url"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Teknolojiler</label>
          <div className="flex gap-2">
            <Input
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              placeholder="Teknoloji adı (örn: React)"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTech(project.tech, (tech) => setProject({ ...project, tech }));
                }
              }}
            />
            <Button
              type="button"
              onClick={() => handleAddTech(project.tech, (tech) => setProject({ ...project, tech }))}
              size="sm"
            >
              Ekle
            </Button>
          </div>
          {project.tech.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center gap-1"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(index, project.tech, (tech) => setProject({ ...project, tech }))}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onCancel} disabled={isSaving}>
            İptal
          </Button>
          <Button onClick={onSave} disabled={isSaving}>
            <Check className="w-4 h-4 mr-2" />
            Kaydet
          </Button>
        </div>
      </div>
    </div>
  );

  if (!isEditable && projects.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Projeler ({user.stats.projects})
          </h2>
          <div className="text-center py-12">
            <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Henüz proje eklenmemiş
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Kullanıcının projeleri burada görüntülenecek
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Projeler ({projects.length})
          </h2>
          <div className="flex gap-2">
            {isEditable && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAdding(!isAdding)}
                disabled={isSaving}
              >
                <Plus className="w-4 h-4 mr-2" />
                {isAdding ? "İptal" : "Proje Ekle"}
              </Button>
            )}
            <Link href="/projects">
              <Button variant="outline" size="sm">
                Tümünü Gör
              </Button>
            </Link>
          </div>
        </div>

        {isEditable && isAdding && (
          <div className="mb-6">
            {renderProjectForm(
              newProject,
              setNewProject,
              handleCreate,
              () => {
                setIsAdding(false);
                setNewProject({
                  title: "",
                  description: "",
                  category: "WEB",
                  tech: [],
                  demo: "",
                  github: "",
                });
              }
            )}
          </div>
        )}

        <div className="space-y-4">
          {projects.length === 0 && !isAdding ? (
            <div className="text-center py-12">
              <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Henüz proje eklenmemiş
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                İlk projenizi ekleyerek başlayın
              </p>
            </div>
          ) : (
            projects.map((project) => (
              <div key={project.id}>
                {editingId === project.id ? (
                  renderProjectForm(
                    editProject,
                    setEditProject,
                    handleUpdate,
                    () => setEditingId(null)
                  )
                ) : (
                  <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {project.title}
                          </h3>
                          {project.category && (
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                                project.category
                              )}`}
                            >
                              {project.category}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-4 flex-wrap">
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="w-3 h-3" />
                            {formatDate(project.createdAt)}
                          </div>
                          {project.tech && project.tech.length > 0 && (
                            <div className="flex items-center gap-2 flex-wrap">
                              {project.tech.slice(0, 3).map((tech, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.tech.length > 3 && (
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  +{project.tech.length - 3} daha
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <Github className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </a>
                        )}
                        {isEditable && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(project)}
                              disabled={isSaving}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(project.id)}
                              disabled={isSaving}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
