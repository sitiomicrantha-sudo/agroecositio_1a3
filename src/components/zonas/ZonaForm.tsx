"use client";

import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface ZonaFormData {
  name: string;
  label: string;
  description: string;
  color: string;
  icon: string;
  order: number;
}

interface ZonaFormProps {
  initialData?: ZonaFormData;
  onSubmit: (data: ZonaFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ZonaForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: ZonaFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ZonaFormData>({
    defaultValues: initialData || {
      name: "",
      label: "",
      description: "",
      color: "#16A34A",
      icon: "🌱",
      order: 1,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        id="name"
        label="Nome"
        {...register("name", { required: "Nome é obrigatório" })}
        error={errors.name?.message}
      />
      <Input
        id="label"
        label="Label"
        {...register("label", { required: "Label é obrigatória" })}
        error={errors.label?.message}
      />
      <Input
        id="description"
        label="Descrição"
        {...register("description")}
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="color" className="block text-sm font-medium text-stone-700">
            Cor
          </label>
          <input
            id="color"
            type="color"
            className="w-full h-10 border border-stone-300 rounded-lg cursor-pointer"
            {...register("color", { required: "Cor é obrigatória" })}
          />
          {errors.color && (
            <p className="text-sm text-red-600">{errors.color.message}</p>
          )}
        </div>
        <Input
          id="icon"
          label="Ícone (emoji)"
          {...register("icon", { required: "Ícone é obrigatório" })}
          error={errors.icon?.message}
        />
      </div>
      <Input
        id="order"
        label="Ordem"
        type="number"
        {...register("order", { required: "Ordem é obrigatória", valueAsNumber: true })}
        error={errors.order?.message}
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
