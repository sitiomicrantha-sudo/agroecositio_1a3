"use client";

import { useState } from "react";
import TreeNode from "./TreeNode";
import UnitGrid from "./UnitGrid";
import FilterToggle from "./FilterToggle";
import { ZONAS } from "@/lib/zonas";

export interface TreeNodeData {
  id: string;
  name: string;
  type: "property" | "talhao" | "unidade";
  status: "active" | "archived";
  area?: string;
  notes?: string;
  unidadeType?: string;
  zonaId?: string;
  zonaName?: string;
  zonaColor?: string;
  children?: TreeNodeData[];
}

interface PropertyInfo {
  id: string;
  name: string;
  location: string;
  totalArea: string;
  owner: string;
}

interface TreeViewProps {
  data: TreeNodeData[];
  property?: PropertyInfo | null;
  talhaoCounts?: Record<string, number>;
  selectedNode?: TreeNodeData | null;
  selectedTalhao?: TreeNodeData | null;
  onSelectNode?: (node: TreeNodeData | null) => void;
  onEdit?: (node: TreeNodeData) => void;
  onArchive?: (node: TreeNodeData) => void;
  onReactivate?: (node: TreeNodeData) => void;
  onAddChild?: (parentId: string, parentType: string) => void;
  onAddUnit?: (talhaoId: string) => void;
}

export default function TreeView({
  data,
  property,
  talhaoCounts = {},
  selectedNode,
  selectedTalhao,
  onSelectNode,
  onEdit,
  onArchive,
  onReactivate,
  onAddChild,
  onAddUnit,
}: TreeViewProps) {
  const [showArchived, setShowArchived] = useState(true);

  const filterNodes = (nodes: TreeNodeData[]): TreeNodeData[] => {
    if (showArchived) return nodes;
    return nodes
      .filter((node) => node.status === "active")
      .map((node) => ({
        ...node,
        children: node.children ? filterNodes(node.children) : undefined,
      }));
  };

  const filteredTalhoes = filterNodes(data);
  const selectedTalhaoUnidades = selectedTalhao?.children || [];

  const getZonaForTalhao = (talhao: TreeNodeData) => {
    const zonaKey = talhao.zonaId as string;
    return zonaKey ? ZONAS[zonaKey as keyof typeof ZONAS] : null;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-stone-800">
            Estrutura da Propriedade
          </h2>
          {property && (
            <div
              className="mt-1 text-sm text-stone-500"
              title={`Proprietário: ${property.owner || "—"}`}
            >
              <span>{property.name}</span>
              {property.location && <span> · {property.location}</span>}
              {property.totalArea && <span> · {(parseFloat(property.totalArea) / 10000).toFixed(2)} ha</span>}
            </div>
          )}
        </div>
        <FilterToggle
          checked={showArchived}
          onChange={setShowArchived}
          label="Ocultar Áreas Arquivadas"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Coluna 1: Talhões */}
        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
          <div className="p-3 border-b border-stone-100 flex items-center justify-between">
            <h3 className="text-sm font-medium text-stone-700">Talhões</h3>
            {onAddChild && (
              <button
                onClick={() => property && onAddChild(property.id, "property")}
                className="text-xs text-green-600 hover:text-green-700 font-medium"
              >
                + Adicionar
              </button>
            )}
          </div>
          <div className="divide-y divide-stone-100">
            {filteredTalhoes.length === 0 ? (
              <div className="p-6 text-center text-stone-500 text-sm">
                Nenhum talhão cadastrado
              </div>
            ) : (
              filteredTalhoes.map((talhao) => {
                const zona = getZonaForTalhao(talhao);
                return (
                  <button
                    key={talhao.id}
                    onClick={() => onSelectNode?.(talhao)}
                    className={`w-full p-3 text-left hover:bg-stone-50 transition-colors ${
                      selectedTalhao?.id === talhao.id
                        ? "bg-green-50 border-l-2 border-green-600"
                        : ""
                    } ${talhao.status === "archived" ? "opacity-50" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {zona && (
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: zona.color }}
                          />
                        )}
                        <span className="font-medium text-stone-800">
                          {talhao.name}
                        </span>
                        {talhao.area && (
                          <span className="text-xs text-stone-500">
                            {(parseFloat(talhao.area) / 10000).toFixed(2)} ha
                          </span>
                        )}
                      </div>
                      {zona && (
                        <span className="text-xs text-stone-400">
                          {zona.icon} {zona.name}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Coluna 2: Unidades */}
        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
          <div className="p-3 border-b border-stone-100">
            <h3 className="text-sm font-medium text-stone-700">
              {selectedTalhao
                ? `Unidades — ${selectedTalhao.name}`
                : "Selecione um talhão"}
            </h3>
          </div>
          {!selectedTalhao ? (
            <div className="p-6 text-center text-stone-500 text-sm">
              Selecione um talhão para ver as unidades
            </div>
          ) : (
            <UnitGrid
              units={selectedTalhaoUnidades}
              zonaColor={selectedTalhao.zonaColor}
              zonaName={selectedTalhao.zonaName}
              onSelect={onSelectNode}
              onAddUnit={selectedTalhao ? () => onAddUnit?.(selectedTalhao.id) : undefined}
            />
          )}
        </div>
      </div>
    </div>
  );
}
