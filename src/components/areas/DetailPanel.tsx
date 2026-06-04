"use client";

import { TreeNodeData } from "./TreeView";
import Button from "@/components/ui/Button";
import { Pencil, Archive } from "lucide-react";

interface DetailPanelProps {
  node: TreeNodeData;
  zonaColor?: string;
  zonaName?: string;
  parentName?: string;
  onEdit?: (node: TreeNodeData) => void;
  onArchive?: (node: TreeNodeData) => void;
}

const typeLabels = {
  property: "Propriedade",
  talhao: "Talhão",
  unidade: "Unidade",
};

function formatArea(area: string, type: "property" | "talhao" | "unidade"): string {
  const value = parseFloat(area);
  if (isNaN(value)) return area;
  
  if (type === "unidade") {
    return `${value} m²`;
  }
  
  const ha = value / 10000;
  return `${ha.toFixed(2)} ha`;
}

export default function DetailPanel({
  node,
  zonaColor,
  zonaName,
  parentName,
  onEdit,
  onArchive,
}: DetailPanelProps) {
  return (
    <div className="bg-white border border-stone-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-stone-800">{node.name}</h3>
          <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded">
            {typeLabels[node.type]}
          </span>
          {zonaColor && (
            <span
              className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
              style={{ color: zonaColor, backgroundColor: `${zonaColor}15` }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: zonaColor }}
              />
              {zonaName}
            </span>
          )}
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit?.(node)}
            title="Editar"
          >
            <Pencil size={14} />
          </Button>
          {node.status === "active" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onArchive?.(node)}
              title="Arquivar"
            >
              <Archive size={14} />
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        {node.area && (
          <div>
            <p className="text-stone-500">Área</p>
            <p className="font-medium text-stone-800">{formatArea(node.area, node.type)}</p>
          </div>
        )}
        {node.unidadeType && (
          <div>
            <p className="text-stone-500">Tipo</p>
            <p className="font-medium text-stone-800">{node.unidadeType}</p>
          </div>
        )}
        {parentName && (
          <div>
            <p className="text-stone-500">
              {node.type === "talhao" ? "Propriedade" : "Talhão"}
            </p>
            <p className="font-medium text-stone-800">{parentName}</p>
          </div>
        )}
        {node.notes && (
          <div className="col-span-2 md:col-span-4">
            <p className="text-stone-500">Notas</p>
            <p className="text-stone-700">{node.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
