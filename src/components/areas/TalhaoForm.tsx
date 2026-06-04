"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

interface Zona {
  id: string;
  name: string;
  label: string;
  description: string | null;
  icon: string;
}

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
  const [zonas, setZonas] = useState<Zona[]>([]);
  const [selectedZona, setSelectedZona] = useState<Zona | null>(null);

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
    fetch("/api/zonas?status=active")
      .then((res) => res.json())
      .then((data) => setZonas(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (zonaId) {
      const zona = zonas.find((z) => z.id === zonaId);
      setSelectedZona(zona || null);
    } else {
      setSelectedZona(null);
    }
  }, [zonaId, zonas]);

  const zonaOptions = zonas.map((z) => ({
    value: z.id,
    label: `${z.icon} ${z.name} — ${z.label}`,
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
        label="Área (ha)"
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
