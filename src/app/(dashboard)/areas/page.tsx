"use client";

import { useState, useEffect, useRef } from "react";
import TreeView, { TreeNodeData } from "@/components/areas/TreeView";
import PropertyForm from "@/components/areas/PropertyForm";
import PropertyDisplay from "@/components/areas/PropertyDisplay";
import TalhaoForm from "@/components/areas/TalhaoForm";
import UnidadeForm from "@/components/areas/UnidadeForm";
import DetailPanel from "@/components/areas/DetailPanel";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";

type ModalType = "property" | "talhao" | "unidade" | "archive" | null;

interface ModalState {
  type: ModalType;
  mode: "create" | "edit";
  parentId?: string;
  parentType?: string;
  node?: TreeNodeData;
}

interface PropertyData {
  id: string;
  name: string;
  location: string;
  totalArea: string;
  owner: string;
}

interface ZonaInfo {
  id: string;
  name: string;
  label: string;
  color: string;
  icon: string;
}

export default function AreasPage() {
  const [treeData, setTreeData] = useState<TreeNodeData[]>([]);
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  const [modal, setModal] = useState<ModalState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [zonas, setZonas] = useState<ZonaInfo[]>([]);
  const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(null);
  const [selectedTalhao, setSelectedTalhao] = useState<TreeNodeData | null>(null);
  const selectedTalhaoIdRef = useRef<string | null>(null);
  const [talhaoCounts, setTalhaoCounts] = useState<Record<string, number>>({});

  const zonasRef = useRef<ZonaInfo[]>([]);

  const findNodeById = (nodes: TreeNodeData[], id: string): TreeNodeData | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  useEffect(() => {
    zonasRef.current = zonas;
  }, [zonas]);

  useEffect(() => {
    selectedTalhaoIdRef.current = selectedTalhao?.id ?? null;
  }, [selectedTalhao]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/zonas?status=active");
        const data = await res.json();
        setZonas(data);
      } catch (error) {
        console.error("Error fetching zonas:", error);
      }
    }
    load();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadTreeData = async () => {
      try {
        const propertiesRes = await fetch("/api/properties");
        const properties = await propertiesRes.json();

        for (const prop of properties) {
          if (cancelled) return;
          setPropertyData({
            id: prop.id as string,
            name: prop.name as string,
            location: prop.location as string,
            totalArea: prop.totalArea as string,
            owner: prop.owner as string,
          });

          const talhoesRes = await fetch(`/api/talhoes?propertyId=${prop.id}`);
          const talhoes = await talhoesRes.json();

          const activeTalhoes = talhoes.filter(
            (t: Record<string, unknown>) => t.status === "active"
          );
          setTalhaoCounts((prev) => ({ ...prev, [prop.id]: activeTalhoes.length }));

          const talhaoNodes: TreeNodeData[] = [];

          for (const talhao of talhoes) {
            if (cancelled) return;
            const zona = zonasRef.current.find(
              (z) => z.id === talhao.zonaId
            );

            const unidadesRes = await fetch(
              `/api/unidades?talhaoId=${talhao.id}`
            );
            const unidades = await unidadesRes.json();

            const unidadeNodes: TreeNodeData[] = unidades.map(
              (u: Record<string, unknown>) => ({
                id: u.id as string,
                name: u.name as string,
                type: "unidade" as const,
                status: u.status as "active" | "archived",
                unidadeType: u.type as string,
              })
            );

            talhaoNodes.push({
              id: talhao.id as string,
              name: talhao.name as string,
              type: "talhao",
              status: talhao.status as "active" | "archived",
              area: talhao.area as string,
              zonaId: talhao.zonaId as string,
              zonaName: zona?.name,
              zonaColor: zona?.color,
              children: unidadeNodes,
            });
          }

          if (!cancelled) {
            setTreeData(talhaoNodes);

            const savedId = selectedTalhaoIdRef.current;
            if (savedId) {
              const reselected = talhaoNodes.find((t) => t.id === savedId);
              if (reselected) setSelectedTalhao(reselected);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching tree data:", error);
      }
    };
    loadTreeData();
    return () => {
      cancelled = true;
    };
  }, [zonas]);

  const refreshData = async () => {
    try {
      const propertiesRes = await fetch("/api/properties");
      const properties = await propertiesRes.json();

      for (const prop of properties) {
        setPropertyData({
          id: prop.id as string,
          name: prop.name as string,
          location: prop.location as string,
          totalArea: prop.totalArea as string,
          owner: prop.owner as string,
        });

        const talhoesRes = await fetch(`/api/talhoes?propertyId=${prop.id}`);
        const talhoes = await talhoesRes.json();

        const activeTalhoes = talhoes.filter(
          (t: Record<string, unknown>) => t.status === "active"
        );
        setTalhaoCounts((prev) => ({ ...prev, [prop.id]: activeTalhoes.length }));

        const talhaoNodes: TreeNodeData[] = [];

        for (const talhao of talhoes) {
          const zona = zonasRef.current.find(
            (z) => z.id === talhao.zonaId
          );

          const unidadesRes = await fetch(
            `/api/unidades?talhaoId=${talhao.id}`
          );
          const unidades = await unidadesRes.json();

          const unidadeNodes: TreeNodeData[] = unidades.map(
            (u: Record<string, unknown>) => ({
              id: u.id as string,
              name: u.name as string,
              type: "unidade" as const,
              status: u.status as "active" | "archived",
              unidadeType: u.type as string,
            })
          );

          talhaoNodes.push({
            id: talhao.id as string,
            name: talhao.name as string,
            type: "talhao",
            status: talhao.status as "active" | "archived",
            area: talhao.area as string,
            zonaId: talhao.zonaId as string,
            zonaName: zona?.name,
            zonaColor: zona?.color,
            children: unidadeNodes,
          });
        }

        setTreeData(talhaoNodes);

        const savedId = selectedTalhaoIdRef.current;
        if (savedId) {
          const reselected = talhaoNodes.find((t) => t.id === savedId);
          if (reselected) setSelectedTalhao(reselected);
        }
      }
    } catch (error) {
      console.error("Error refreshing tree data:", error);
    }
  };

  const handleEdit = (node: TreeNodeData) => {
    setModal({ type: node.type, mode: "edit", node });
  };

  const handleArchive = (node: TreeNodeData) => {
    setModal({ type: "archive", mode: "edit", node });
  };

  const handleReactivate = async (node: TreeNodeData) => {
    const endpoints: Record<string, string> = {
      talhao: `/api/talhoes/${node.id}`,
      unidade: `/api/unidades/${node.id}`,
    };

    const endpoint = endpoints[node.type];
    if (!endpoint) return;

    try {
      await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "active" }),
      });
      refreshData();
    } catch (error) {
      console.error("Error reactivating:", error);
    }
  };

  const handleAddChild = (parentId: string, parentType: string) => {
    const childType: Record<string, ModalType> = {
      property: "talhao",
      talhao: "unidade",
    };
    setModal({
      type: childType[parentType],
      mode: "create",
      parentId,
      parentType,
    });
  };

  const handlePropertySubmit = async (data: {
    name: string;
    location: string;
    totalArea: string;
    owner: string;
  }) => {
    setIsLoading(true);
    try {
      if (modal?.mode === "edit" && modal.node) {
        await fetch(`/api/properties/${modal.node.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        await fetch("/api/properties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      refreshData();
      setModal(null);
    } catch (error) {
      console.error("Error saving property:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePropertySave = async (data: {
    name: string;
    location: string;
    totalArea: string;
    owner: string;
  }) => {
    setIsLoading(true);
    try {
      if (propertyData) {
        const response = await fetch(`/api/properties/${propertyData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Erro ao salvar propriedade");
        }

        refreshData();
      }
    } catch (error) {
      console.error("Error saving property:", error);
      alert("Erro ao salvar propriedade. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTalhaoSubmit = async (data: {
    name: string;
    area: string;
    zonaId: string;
  }) => {
    setIsLoading(true);
    try {
      const body = {
        ...data,
        propertyId: modal?.parentId || propertyData?.id,
      };

      if (modal?.mode === "edit" && modal.node) {
        const response = await fetch(`/api/talhoes/${modal.node.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.status === 409) {
          const { error } = await response.json();
          alert(error);
          setIsLoading(false);
          return;
        }
      } else {
        const response = await fetch("/api/talhoes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (response.status === 409) {
          const { error } = await response.json();
          alert(error);
          setIsLoading(false);
          return;
        }
      }
      refreshData();
      setModal(null);
    } catch (error) {
      console.error("Error saving talhao:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnidadeSubmit = async (data: { name: string; type: string }) => {
    setIsLoading(true);
    try {
      const body = {
        ...data,
        talhaoId: modal?.parentId || modal?.node?.id,
      };

      if (modal?.mode === "edit" && modal.node) {
        await fetch(`/api/unidades/${modal.node.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        await fetch("/api/unidades", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }
      refreshData();
      setModal(null);
    } catch (error) {
      console.error("Error saving unidade:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleArchiveConfirm = async () => {
    if (!modal?.node) return;

    setIsLoading(true);
    try {
      const endpoints: Record<string, string> = {
        talhao: `/api/talhoes/${modal.node.id}`,
        unidade: `/api/unidades/${modal.node.id}`,
      };

      const endpoint = endpoints[modal.node.type];
      if (endpoint) {
        await fetch(endpoint, { method: "DELETE" });
        refreshData();
      }
      setModal(null);
    } catch (error) {
      console.error("Error archiving:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasProperty = treeData.length > 0;

  const handleSelectNode = (node: TreeNodeData | null) => {
    if (node?.type === "talhao") {
      setSelectedTalhao(node);
      setSelectedNode(node);
      selectedTalhaoIdRef.current = node.id;
    } else if (node?.type === "unidade") {
      setSelectedNode(node);
    } else {
      setSelectedTalhao(null);
      setSelectedNode(null);
      selectedTalhaoIdRef.current = null;
    }
  };

  const getZonaForNode = (node: TreeNodeData) => {
    if (node.zonaId) {
      return zonas.find((z) => z.id === node.zonaId);
    }
    return null;
  };

  const getParentName = (node: TreeNodeData): string | undefined => {
    if (node.type === "talhao") return propertyData?.name;
    if (node.type === "unidade") {
      const talhao = treeData.find((t) =>
        t.children?.some((u) => u.id === node.id)
      );
      return talhao?.name;
    }
    return undefined;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Áreas</h1>
          <p className="text-stone-600">
            Gerencie a estrutura da sua propriedade
          </p>
        </div>
        <div className="flex gap-3">
          {!hasProperty && (
            <Button
              onClick={() => setModal({ type: "property", mode: "create" })}
            >
              <Plus size={16} className="mr-1" />
              Criar Propriedade
            </Button>
          )}
        </div>
      </div>

      {propertyData && (
        <PropertyDisplay
          data={propertyData}
          onSave={handlePropertySave}
          isLoading={isLoading}
        />
      )}

      <TreeView
        data={treeData}
        property={propertyData}
        zonas={zonas}
        talhaoCounts={talhaoCounts}
        selectedNode={selectedNode}
        selectedTalhao={selectedTalhao}
        onSelectNode={handleSelectNode}
        onEdit={handleEdit}
        onArchive={handleArchive}
        onReactivate={handleReactivate}
        onAddChild={handleAddChild}
      />

      {selectedNode && (
        <DetailPanel
          node={selectedNode}
          zonaColor={getZonaForNode(selectedNode)?.color}
          zonaName={
            getZonaForNode(selectedNode)
              ? `${getZonaForNode(selectedNode)?.icon} ${getZonaForNode(selectedNode)?.name}`
              : undefined
          }
          parentName={getParentName(selectedNode)}
          onEdit={handleEdit}
          onArchive={handleArchive}
        />
      )}

      {/* Property Modal */}
      <Modal
        isOpen={modal?.type === "property"}
        onClose={() => setModal(null)}
        title={
          modal?.mode === "edit" ? "Editar Propriedade" : "Nova Propriedade"
        }
        showConfirm={false}
      >
        <PropertyForm
          initialData={
            modal?.mode === "edit" && modal.node
              ? {
                  name: modal.node.name,
                  location: "",
                  totalArea: modal.node.area || "",
                  owner: "",
                }
              : undefined
          }
          onSubmit={handlePropertySubmit}
          onCancel={() => setModal(null)}
          isLoading={isLoading}
        />
      </Modal>

      {/* Talhao Modal */}
      <Modal
        isOpen={modal?.type === "talhao"}
        onClose={() => setModal(null)}
        title={modal?.mode === "edit" ? "Editar Talhão" : "Novo Talhão"}
        showConfirm={false}
      >
        <TalhaoForm
          initialData={
            modal?.mode === "edit" && modal.node
              ? {
                  name: modal.node.name,
                  area: modal.node.area || "",
                  zonaId: modal.node.zonaId || "",
                }
              : undefined
          }
          onSubmit={handleTalhaoSubmit}
          onCancel={() => setModal(null)}
          isLoading={isLoading}
        />
      </Modal>

      {/* Unidade Modal */}
      <Modal
        isOpen={modal?.type === "unidade"}
        onClose={() => setModal(null)}
        title={
          modal?.mode === "edit"
            ? "Editar Unidade Menor"
            : "Nova Unidade Menor"
        }
        showConfirm={false}
      >
        <UnidadeForm
          initialData={
            modal?.mode === "edit" && modal.node
              ? {
                  name: modal.node.name,
                  type: modal.node.unidadeType || "canteiro",
                }
              : undefined
          }
          onSubmit={handleUnidadeSubmit}
          onCancel={() => setModal(null)}
          isLoading={isLoading}
        />
      </Modal>

      {/* Archive Confirmation Modal */}
      <Modal
        isOpen={modal?.type === "archive"}
        onClose={() => setModal(null)}
        title="Confirmar Arquivamento"
        onConfirm={handleArchiveConfirm}
        confirmText="Arquivar"
      >
        <p className="text-stone-600">
          Tem certeza que deseja arquivar{" "}
          <strong>{modal?.node?.name}</strong>?
          {modal?.node?.type !== "unidade" && (
            <span className="block mt-2 text-sm text-stone-500">
              Todas as áreas filhas também serão arquivadas.
            </span>
          )}
        </p>
      </Modal>
    </div>
  );
}
