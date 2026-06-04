"use client";

import { TreeNodeData } from "./TreeView";

interface UnitGridProps {
  units: TreeNodeData[];
  zonaColor?: string;
  zonaName?: string;
  onSelect?: (node: TreeNodeData) => void;
}

export default function UnitGrid({
  units,
  zonaColor,
  zonaName,
  onSelect,
}: UnitGridProps) {
  if (units.length === 0) {
    return (
      <div className="p-8 text-center text-stone-500">
        Nenhuma unidade cadastrada
      </div>
    );
  }

  const getGridCols = (count: number) => {
    if (count <= 4) return "grid-cols-2";
    if (count <= 12) return "grid-cols-3";
    return "grid-cols-4";
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-sm font-medium text-stone-700">Unidades</h3>
        <span className="text-xs text-stone-500">({units.length})</span>
      </div>
      <div className={`grid ${getGridCols(units.length)} gap-3`}>
        {units.map((unit) => (
          <button
            key={unit.id}
            onClick={() => onSelect?.(unit)}
            className="bg-white border border-stone-200 rounded-lg p-3 text-left hover:border-green-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-2 mb-1">
              {zonaColor && (
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: zonaColor }}
                />
              )}
              <span className="font-medium text-stone-800 text-sm truncate">
                {unit.name}
              </span>
            </div>
            {unit.unidadeType && (
              <span className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                {unit.unidadeType}
              </span>
            )}
            {zonaName && (
              <p className="text-xs text-stone-400 mt-1">{zonaName}</p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
