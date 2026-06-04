"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";

interface TipoUnidade {
  id: string;
  name: string;
}

interface UnidadeFormData {
  name: string;
  tipoUnidadeId: string;
  area: string;
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
  const [tipos, setTipos] = useState<TipoUnidade[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UnidadeFormData>({
    defaultValues: initialData || {
      name: "",
      tipoUnidadeId: "",
      area: "",
    },
  });

  useEffect(() => {
    fetch("/api/tipos-unidade")
      .then((res) => res.json())
      .then((data) => setTipos(data))
      .catch(console.error);
  }, []);

  const tipoOptions = tipos.map((t) => ({
    value: t.id,
    label: t.name,
  }));

  const handleAddAnother = () => {
    handleSubmit((data) => {
      onSubmit(data);
      reset({ name: "", tipoUnidadeId: "", area: "" });
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
        id="tipoUnidadeId"
        label="Tipo"
        options={tipoOptions}
        {...register("tipoUnidadeId", { required: "Tipo é obrigatório" })}
        error={errors.tipoUnidadeId?.message}
      />
      <Input
        id="area"
        label="Área (m²)"
        type="number"
        step="0.01"
        {...register("area")}
        error={errors.area?.message}
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
