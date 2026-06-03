"use client";

import { useState } from "react";
import TreeNode from "./TreeNode";
import FilterToggle from "./FilterToggle";

export interface TreeNodeData {
  id: string;
  name: string;
  type: "property" | "gleba" | "talhao" | "unidade";
  status: "active" | "archived";
  area?: string;
  notes?: string;
  unidadeType?: string;
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
  onEdit?: (node: TreeNodeData) => void;
  onArchive?: (node: TreeNodeData) => void;
  onReactivate?: (node: TreeNodeData) => void;
  onAddChild?: (parentId: string, parentType: string) => void;
}

export default function TreeView({
  data,
  property,
  onEdit,
  onArchive,
  onReactivate,
  onAddChild,
}: TreeViewProps) {
  const [showArchived, setShowArchived] = useState(true);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const toggleExpand = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const filterNodes = (nodes: TreeNodeData[]): TreeNodeData[] => {
    if (showArchived) return nodes;

    return nodes
      .filter((node) => node.status === "active")
      .map((node) => ({
        ...node,
        children: node.children ? filterNodes(node.children) : undefined,
      }));
  };

  const filteredData = filterNodes(data);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-stone-800">
            Estrutura da Propriedade
          </h2>
          {property && (
            <div className="mt-1 text-sm text-stone-500" title={`Proprietário: ${property.owner || "—"}`}>
              <span>{property.name}</span>
              {property.location && <span> • {property.location}</span>}
              {property.totalArea && <span> • {property.totalArea} ha</span>}
            </div>
          )}
        </div>
        <FilterToggle
          checked={showArchived}
          onChange={setShowArchived}
          label="Ocultar Áreas Arquivadas"
        />
      </div>

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        {filteredData.length === 0 ? (
          <div className="p-8 text-center text-stone-500">
            Nenhuma área cadastrada
          </div>
        ) : (
          filteredData.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              level={0}
              isExpanded={expandedNodes.has(node.id)}
              onToggleExpand={() => toggleExpand(node.id)}
              expandedNodes={expandedNodes}
              onToggleNode={toggleExpand}
              onEdit={onEdit}
              onArchive={onArchive}
              onReactivate={onReactivate}
              onAddChild={onAddChild}
            />
          ))
        )}
      </div>
    </div>
  );
}
