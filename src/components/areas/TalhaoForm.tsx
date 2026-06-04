"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { ZONAS, ZONA_OPTIONS } from "@/lib/zonas";

interface TalhaoFormData {
  name: string;
  area: string;
  zonaId: string;
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
  const [selectedZona, setSelectedZona] = useState<{ name: string; description: string | null } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TalhaoFormData>({
    defaultValues: initialData || {
      name: "",
      area: "",
      zonaId: "",
    },
  });

  const zonaId = watch("zonaId");

  useEffect(() => {
    if (zonaId) {
      const zona = ZONAS[zonaId as keyof typeof ZONAS];
      setSelectedZona(zona ? { name: zona.name, description: zona.description } : null);
    } else {
      setSelectedZona(null);
    }
  }, [zonaId]);

  const zonaOptions = ZONA_OPTIONS.map((z) => ({
    value: z.value,
    label: z.label,
  }));

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
        label="Área (m²)"
        type="number"
        step="0.01"
        {...register("area", { required: "Área é obrigatória" })}
        error={errors.area?.message}
      />
      <Select
        id="zonaId"
        label="Zona de Permacultura"
        options={zonaOptions}
        {...register("zonaId", { required: "Zona é obrigatória" })}
        error={errors.zonaId?.message}
      />
      {selectedZona && selectedZona.description && (
        <p className="text-sm text-stone-500 -mt-2">
          {selectedZona.description}
        </p>
      )}
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
