"use client";

import {
  ChevronRight,
  ChevronDown,
  Layers,
  Grid3X3,
  Home,
  Pencil,
  Archive,
  RotateCcw,
  Plus,
} from "lucide-react";
import { TreeNodeData } from "./TreeView";
import Button from "@/components/ui/Button";

interface TreeNodeProps {
  node: TreeNodeData;
  level: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  expandedNodes: Set<string>;
  onToggleNode: (id: string) => void;
  onEdit?: (node: TreeNodeData) => void;
  onArchive?: (node: TreeNodeData) => void;
  onReactivate?: (node: TreeNodeData) => void;
  onAddChild?: (parentId: string, parentType: string) => void;
}

const typeIcons = {
  property: Home,
  talhao: Layers,
  unidade: Grid3X3,
};

const typeLabels = {
  property: "Propriedade",
  talhao: "Talhão",
  unidade: "Unidade",
};

const addChildLabels = {
  property: "Adicionar Talhão",
  talhao: "Adicionar Unidade",
  unidade: undefined,
};

export default function TreeNode({
  node,
  level,
  isExpanded,
  onToggleExpand,
  expandedNodes,
  onToggleNode,
  onEdit,
  onArchive,
  onReactivate,
  onAddChild,
}: TreeNodeProps) {
  const Icon = typeIcons[node.type];
  const hasChildren = node.children && node.children.length > 0;
  const isArchived = node.status === "archived";
  const canAddChild = node.type !== "unidade";

  return (
    <div>
      <div
        className={`flex items-center gap-2 px-4 py-3 border-b border-stone-100 hover:bg-stone-50 transition-colors ${
          isArchived ? "opacity-50" : ""
        }`}
        style={{ paddingLeft: `${level * 24 + 16}px` }}
      >
        {hasChildren ? (
          <button
            onClick={onToggleExpand}
            className="p-1 text-stone-400 hover:text-stone-600"
          >
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>
        ) : (
          <div className="w-6" />
        )}

        <Icon
          size={18}
          className={isArchived ? "text-stone-400" : "text-green-600"}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`font-medium truncate ${
                isArchived
                  ? "text-stone-400 line-through"
                  : "text-stone-800"
              }`}
            >
              {node.name}
            </span>
            <span className="text-xs text-stone-400">
              {typeLabels[node.type]}
            </span>
            {node.unidadeType && (
              <span className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                {node.unidadeType}
              </span>
            )}
            {node.zonaName && node.zonaColor && (
              <span
                className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                style={{
                  color: node.zonaColor,
                  backgroundColor: `${node.zonaColor}15`,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: node.zonaColor }}
                />
                {node.zonaName}
              </span>
            )}
          </div>
          {node.area && (
            <span className="text-xs text-stone-500">{node.area} ha</span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {canAddChild && onAddChild && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAddChild(node.id, node.type)}
              title={addChildLabels[node.type]}
            >
              <Plus size={14} />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit?.(node)}
            title="Editar"
          >
            <Pencil size={14} />
          </Button>
          {isArchived ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReactivate?.(node)}
              title="Reativar"
            >
              <RotateCcw size={14} />
            </Button>
          ) : (
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

      {isExpanded && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              isExpanded={expandedNodes.has(child.id)}
              onToggleExpand={() => onToggleNode(child.id)}
              expandedNodes={expandedNodes}
              onToggleNode={onToggleNode}
              onEdit={onEdit}
              onArchive={onArchive}
              onReactivate={onReactivate}
              onAddChild={onAddChild}
            />
          ))}
        </div>
      )}
    </div>
  );
}
