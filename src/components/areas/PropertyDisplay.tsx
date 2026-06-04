"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Pencil, X, Check } from "lucide-react";

interface PropertyFormData {
  name: string;
  location: string;
  totalArea: string;
  owner: string;
}

interface PropertyDisplayProps {
  data: PropertyFormData;
  onSave: (data: PropertyFormData) => Promise<void>;
  isLoading?: boolean;
}

export default function PropertyDisplay({
  data,
  onSave,
  isLoading = false,
}: PropertyDisplayProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<PropertyFormData>(data);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PropertyFormData>({
    defaultValues: data,
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(data);
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset(data);
  };

  const handleSave = async (formData: PropertyFormData) => {
    await onSave(formData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white border border-stone-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-stone-800">
            Dados da Propriedade
          </h3>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              disabled={isLoading}
            >
              <X size={16} className="mr-1" />
              Cancelar
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleSubmit(handleSave)}
              disabled={isLoading}
            >
              <Check size={16} className="mr-1" />
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
        <form className="space-y-4">
          <Input
            id="name"
            label="Nome da Propriedade"
            {...register("name", { required: "Nome é obrigatório" })}
            error={errors.name?.message}
          />
          <Input
            id="location"
            label="Localização"
            {...register("location", { required: "Localização é obrigatória" })}
            error={errors.location?.message}
          />
          <Input
            id="totalArea"
            label="Área Total (m²)"
            type="number"
            step="0.01"
            {...register("totalArea", { required: "Área é obrigatória" })}
            error={errors.totalArea?.message}
          />
          <Input
            id="owner"
            label="Proprietário"
            {...register("owner", { required: "Proprietário é obrigatório" })}
            error={errors.owner?.message}
          />
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-stone-800">
          Dados da Propriedade
        </h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleEdit}
        >
          <Pencil size={16} className="mr-1" />
          Editar
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-stone-500">Nome</p>
          <p className="text-stone-800">{data.name || "—"}</p>
        </div>
        <div>
          <p className="text-sm text-stone-500">Localização</p>
          <p className="text-stone-800">{data.location || "—"}</p>
        </div>
        <div>
          <p className="text-sm text-stone-500">Área Total</p>
          <p className="text-stone-800">{data.totalArea ? `${(parseFloat(data.totalArea) / 10000).toFixed(2)} ha` : "—"}</p>
        </div>
        <div>
          <p className="text-sm text-stone-500">Proprietário</p>
          <p className="text-stone-800">{data.owner || "—"}</p>
        </div>
      </div>
    </div>
  );
}
