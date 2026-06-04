"use client";

import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface PropertyFormData {
  name: string;
  location: string;
  totalArea: string;
  owner: string;
}

interface PropertyFormProps {
  initialData?: PropertyFormData;
  onSubmit: (data: PropertyFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function PropertyForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: PropertyFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyFormData>({
    defaultValues: initialData || {
      name: "",
      location: "",
      totalArea: "",
      owner: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Salvando..." : initialData ? "Salvar" : "Criar"}
        </Button>
      </div>
    </form>
  );
}
