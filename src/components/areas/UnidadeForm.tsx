"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";

const unidadeTypeOptions = [
  { value: "canteiro", label: "Canteiro" },
  { value: "saf_line", label: "Linha de SAF" },
  { value: "piquete", label: "Piquete" },
  { value: "galinheiro", label: "Galinheiro" },
  { value: "composteira", label: "Composteira" },
  { value: "estufa", label: "Estufa" },
  { value: "outro", label: "Outro" },
];

interface UnidadeFormData {
  name: string;
  type: string;
}

interface UnidadeFormProps {
  initialData?: UnidadeFormData;
  onSubmit: (data: UnidadeFormData) => void;
  onAddAnother?: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  showAddAnother?: boolean;
}

export default function UnidadeForm({
  initialData,
  onSubmit,
  onAddAnother,
  onCancel,
  isLoading = false,
  showAddAnother = true,
}: UnidadeFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UnidadeFormData>({
    defaultValues: initialData || {
      name: "",
      type: "canteiro",
    },
  });

  const handleAddAnother = () => {
    handleSubmit((data) => {
      onSubmit(data);
      reset({ name: "", type: "canteiro" });
      onAddAnother?.();
    })();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        id="name"
        label="Nome/Numeração"
        {...register("name", { required: "Nome é obrigatório" })}
        error={errors.name?.message}
      />
      <Select
        id="type"
        label="Tipo"
        options={unidadeTypeOptions}
        {...register("type", { required: "Tipo é obrigatório" })}
        error={errors.type?.message}
      />
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        {showAddAnother && (
          <Button
            type="button"
            variant="secondary"
            onClick={handleAddAnother}
            disabled={isLoading}
          >
            <Plus size={16} className="mr-1" />
            Adicionar outro
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Salvando..." : initialData ? "Salvar" : "Criar"}
        </Button>
      </div>
    </form>
  );
}
