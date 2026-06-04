"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Map, ChevronRight } from "lucide-react";
import { ZONAS } from "@/lib/zonas";

interface Property {
  id: string;
  name: string;
  location: string;
  totalArea: string;
  owner: string;
}

interface Talhao {
  id: string;
  name: string;
  area: string;
  zonaId: string;
  status: string;
}

interface Unidade {
  id: string;
  name: string;
  tipoUnidadeId: string;
  area: string | null;
  status: string;
}

interface TipoUnidade {
  id: string;
  name: string;
}

const MAX_TALHOES = 6;

export default function AreaOverviewCard() {
  const [property, setProperty] = useState<Property | null>(null);
  const [talhoes, setTalhoes] = useState<Talhao[]>([]);
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [tipos, setTipos] = useState<TipoUnidade[]>([]);
  const [selectedTalhaoId, setSelectedTalhaoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const propRes = await fetch("/api/properties");
        const props = await propRes.json();
        if (props.length > 0) {
          const prop = props[0];
          setProperty(prop);

          const talhoesRes = await fetch(`/api/talhoes?propertyId=${prop.id}`);
          const allTalhoes = await talhoesRes.json();
          setTalhoes(allTalhoes.filter((t: Talhao) => t.status === "active"));
        }

        const tiposRes = await fetch("/api/tipos-unidade");
        setTipos(await tiposRes.json());
      } catch (error) {
        console.error("Error loading areas overview:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!selectedTalhaoId) {
      setUnidades([]);
      return;
    }

    async function loadUnidades() {
      try {
        const res = await fetch(`/api/unidades?talhaoId=${selectedTalhaoId}`);
        const data = await res.json();
        setUnidades(data.filter((u: Unidade) => u.status === "active"));
      } catch (error) {
        console.error("Error loading unidades:", error);
      }
    }
    loadUnidades();
  }, [selectedTalhaoId]);

  const getZona = (zonaId: string) => ZONAS[zonaId as keyof typeof ZONAS];
  const getTipoName = (tipoId: string) => tipos.find((t) => t.id === tipoId)?.name || "";
  const formatHa = (m2: string) => (parseFloat(m2) / 10000).toFixed(2);

  const visibleTalhoes = talhoes.slice(0, MAX_TALHOES);
  const hasMore = talhoes.length > MAX_TALHOES;

  if (loading) {
    return (
      <div className="bg-white border border-stone-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-50 rounded-lg">
            <Map className="text-green-600" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-stone-800">Estrutura da Propriedade</h3>
            <div className="h-4 w-48 bg-stone-100 rounded animate-pulse mt-1" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-stone-50 rounded animate-pulse" />
            ))}
          </div>
          <div className="h-32 bg-stone-50 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="bg-white border border-stone-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-50 rounded-lg">
            <Map className="text-green-600" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-stone-800">Estrutura da Propriedade</h3>
            <p className="text-sm text-stone-500">Nenhuma propriedade cadastrada</p>
          </div>
        </div>
        <div className="text-center py-8 text-stone-500 text-sm">
          Cadastre uma propriedade para ver a estrutura
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-4 md:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-50 rounded-lg">
          <Map className="text-green-600" size={20} />
        </div>
        <div>
          <Link
            href="/areas"
            className="font-semibold text-stone-800 hover:text-green-600 transition-colors"
          >
            Estrutura da Propriedade
          </Link>
          <p className="text-sm text-stone-500">
            {property.name}
            {property.totalArea && ` · ${formatHa(property.totalArea)} ha`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Coluna de Talhões */}
        <div>
          <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-2">
            Talhões
          </h4>
          <div className="space-y-1">
            {visibleTalhoes.length === 0 ? (
              <p className="text-sm text-stone-400 py-4 text-center">
                Nenhum talhão cadastrado
              </p>
            ) : (
              visibleTalhoes.map((talhao) => {
                const zona = getZona(talhao.zonaId);
                const isSelected = selectedTalhaoId === talhao.id;
                return (
                  <button
                    key={talhao.id}
                    onClick={() => setSelectedTalhaoId(talhao.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
                      isSelected
                        ? "bg-green-50 border-l-2 border-green-600"
                        : "hover:bg-stone-50 border-l-2 border-transparent"
                    }`}
                  >
                    {zona && (
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: zona.color }}
                      />
                    )}
                    <span className="text-sm font-medium text-stone-700 truncate flex-1">
                      {talhao.name}
                    </span>
                    {talhao.area && (
                      <span className="text-xs text-stone-400 flex-shrink-0">
                        {formatHa(talhao.area)} ha
                      </span>
                    )}
                  </button>
                );
              })
            )}
            {hasMore && (
              <Link
                href="/areas"
                className="flex items-center gap-1 text-xs text-green-600 hover:text-green-700 px-3 py-2"
              >
                Ver todos os talhões
                <ChevronRight size={12} />
              </Link>
            )}
          </div>
        </div>

        {/* Coluna de Unidades */}
        <div>
          <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-2">
            Unidades
          </h4>
          {!selectedTalhaoId ? (
            <div className="flex items-center justify-center h-32 text-sm text-stone-400">
              Selecione um talhão
            </div>
          ) : unidades.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-sm text-stone-400">
              Nenhuma unidade
            </div>
          ) : (
            <div className="space-y-1">
              {unidades.map((unidade) => (
                <div
                  key={unidade.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-50"
                >
                  <span className="text-sm text-stone-700 truncate flex-1">
                    {unidade.name}
                  </span>
                  <span className="text-xs text-stone-400 bg-white px-2 py-0.5 rounded flex-shrink-0">
                    {getTipoName(unidade.tipoUnidadeId)}
                  </span>
                  {unidade.area && (
                    <span className="text-xs text-stone-500 flex-shrink-0">
                      {unidade.area} m²
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
