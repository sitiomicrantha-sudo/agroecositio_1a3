"use client";

import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface TalhaoFormData {
  name: string;
  area: string;
}

interface TalhaoFormProps {
  initialData?: TalhaoFormData;
  onSubmit: (data: TalhaoFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function TalhaoForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: TalhaoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TalhaoFormData>({
    defaultValues: initialData || {
      name: "",
      area: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        id="name"
        label="Nome do Talhão"
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
