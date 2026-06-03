"use client";

import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface GlebaFormData {
  name: string;
  area: string;
  notes: string;
}

interface GlebaFormProps {
  initialData?: GlebaFormData;
  onSubmit: (data: GlebaFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function GlebaForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: GlebaFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GlebaFormData>({
    defaultValues: initialData || {
      name: "",
      area: "",
      notes: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        id="name"
        label="Nome da Gleba"
        {...register("name", { required: "Nome é obrigatório" })}
        error={errors.name?.message}
      />
      <Input
        id="area"
        label="Área (ha)"
        type="number"
        step="0.01"
        {...register("area", { required: "Área é obrigatória" })}
        error={errors.area?.message}
      />
      <Input
        id="notes"
        label="Observações"
        {...register("notes")}
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
