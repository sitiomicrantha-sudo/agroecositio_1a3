"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import ZonaForm from "./ZonaForm";
import { Plus, Pencil, Archive } from "lucide-react";

interface Zona {
  id: string;
  name: string;
  label: string;
  description: string | null;
  color: string;
  icon: string;
  order: number;
  status: "active" | "archived";
}

export default function ZonaList() {
  const [zonas, setZonas] = useState<Zona[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    zona?: Zona;
  }>({ isOpen: false, mode: "create" });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/zonas");
        const data = await res.json();
        setZonas(data);
      } catch (error) {
        console.error("Error fetching zonas:", error);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const refreshZonas = async () => {
    const res = await fetch("/api/zonas");
    const data = await res.json();
    setZonas(data);
  };

  const handleSubmit = async (data: {
    name: string;
    label: string;
    description: string;
    color: string;
    icon: string;
    order: number;
  }) => {
    setIsLoading(true);
    try {
      if (modal.mode === "edit" && modal.zona) {
        await fetch(`/api/zonas/${modal.zona.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        await fetch("/api/zonas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      refreshZonas();
      setModal({ isOpen: false, mode: "create" });
    } catch (error) {
      console.error("Error saving zona:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleArchive = async (id: string) => {
    if (!confirm("Tem certeza que deseja arquivar esta zona?")) return;
    try {
      await fetch(`/api/zonas/${id}`, { method: "DELETE" });
      refreshZonas();
    } catch (error) {
      console.error("Error archiving zona:", error);
    }
  };

  if (isLoading) {
    return <div className="text-stone-500">Carregando zonas...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">
            Zonas de Permacultura
          </h1>
          <p className="text-stone-600">
            Gerencie as zonas de manejo da propriedade
          </p>
        </div>
        <Button onClick={() => setModal({ isOpen: true, mode: "create" })}>
          <Plus size={16} className="mr-1" />
          Nova Zona
        </Button>
      </div>

      <div className="space-y-3">
        {zonas.map((zona) => (
          <div
            key={zona.id}
            className={`bg-white border border-stone-200 rounded-xl p-4 ${
              zona.status === "archived" ? "opacity-50" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{zona.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-stone-800">
                      {zona.name}
                    </h3>
                    <span className="text-stone-500">·</span>
                    <span className="text-stone-600">{zona.label}</span>
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: zona.color }}
                    />
                  </div>
                  {zona.description && (
                    <p className="text-sm text-stone-500 mt-1">
                      {zona.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setModal({ isOpen: true, mode: "edit", zona })
                  }
                  title="Editar"
                >
                  <Pencil size={14} />
                </Button>
                {zona.status === "active" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleArchive(zona.id)}
                    title="Arquivar"
                  >
                    <Archive size={14} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ isOpen: false, mode: "create" })}
        title={modal.mode === "edit" ? "Editar Zona" : "Nova Zona"}
        showConfirm={false}
      >
        <ZonaForm
          initialData={
            modal.mode === "edit" && modal.zona
              ? {
                  name: modal.zona.name,
                  label: modal.zona.label,
                  description: modal.zona.description || "",
                  color: modal.zona.color,
                  icon: modal.zona.icon,
                  order: modal.zona.order,
                }
              : undefined
          }
          onSubmit={handleSubmit}
          onCancel={() => setModal({ isOpen: false, mode: "create" })}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
}
