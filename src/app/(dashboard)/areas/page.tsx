"use client";

import { useState, useEffect, useCallback } from "react";
import TreeView, { TreeNodeData } from "@/components/areas/TreeView";
import PropertyForm from "@/components/areas/PropertyForm";
import PropertyDisplay from "@/components/areas/PropertyDisplay";
import GlebaForm from "@/components/areas/GlebaForm";
import TalhaoForm from "@/components/areas/TalhaoForm";
import UnidadeForm from "@/components/areas/UnidadeForm";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";

type ModalType = "property" | "gleba" | "talhao" | "unidade" | "archive" | null;

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

export default function AreasPage() {
  const [treeData, setTreeData] = useState<TreeNodeData[]>([]);
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  const [modal, setModal] = useState<ModalState | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTreeData = useCallback(async () => {
    try {
      const propertiesRes = await fetch("/api/properties");
      const properties = await propertiesRes.json();

      const tree: TreeNodeData[] = [];

      for (const prop of properties) {
        setPropertyData({
          id: prop.id as string,
          name: prop.name as string,
          location: prop.location as string,
          totalArea: prop.totalArea as string,
          owner: prop.owner as string,
        });
        const glebasRes = await fetch(`/api/glebas?propertyId=${prop.id}`);
        const glebas = await glebasRes.json();

        const glebaNodes: TreeNodeData[] = [];

        for (const gleba of glebas) {
          const talhoesRes = await fetch(`/api/talhoes?glebaId=${gleba.id}`);
          const talhoes = await talhoesRes.json();

          const talhaoNodes: TreeNodeData[] = [];

          for (const talhao of talhoes) {
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
              children: unidadeNodes,
            });
          }

          glebaNodes.push({
            id: gleba.id as string,
            name: gleba.name as string,
            type: "gleba",
            status: gleba.status as "active" | "archived",
            area: gleba.area as string,
            notes: gleba.notes as string,
            children: talhaoNodes,
          });
        }

        tree.push(...glebaNodes);
      }

      setTreeData(tree);
    } catch (error) {
      console.error("Error fetching tree data:", error);
    }
  }, []);

  useEffect(() => {
    fetchTreeData();
  }, [fetchTreeData]);

  const handleEdit = (node: TreeNodeData) => {
    setModal({ type: node.type, mode: "edit", node });
  };

  const handleArchive = (node: TreeNodeData) => {
    setModal({ type: "archive", mode: "edit", node });
  };

  const handleReactivate = async (node: TreeNodeData) => {
    const endpoints: Record<string, string> = {
      gleba: `/api/glebas/${node.id}`,
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
      fetchTreeData();
    } catch (error) {
      console.error("Error reactivating:", error);
    }
  };

  const handleAddChild = (parentId: string, parentType: string) => {
    const childType: Record<string, ModalType> = {
      property: "gleba",
      gleba: "talhao",
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
      fetchTreeData();
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
        
        fetchTreeData();
      }
    } catch (error) {
      console.error("Error saving property:", error);
      alert("Erro ao salvar propriedade. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGlebaSubmit = async (data: {
    name: string;
    area: string;
    notes: string;
  }) => {
    setIsLoading(true);
    try {
      const body = {
        ...data,
        propertyId: modal?.parentId || modal?.node?.id,
      };

      if (modal?.mode === "edit" && modal.node) {
        await fetch(`/api/glebas/${modal.node.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        await fetch("/api/glebas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }
      fetchTreeData();
      setModal(null);
    } catch (error) {
      console.error("Error saving gleba:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTalhaoSubmit = async (data: { name: string; area: string }) => {
    setIsLoading(true);
    try {
      const body = {
        ...data,
        glebaId: modal?.parentId || modal?.node?.id,
      };

      if (modal?.mode === "edit" && modal.node) {
        await fetch(`/api/talhoes/${modal.node.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        await fetch("/api/talhoes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }
      fetchTreeData();
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
      fetchTreeData();
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
        gleba: `/api/glebas/${modal.node.id}`,
        talhao: `/api/talhoes/${modal.node.id}`,
        unidade: `/api/unidades/${modal.node.id}`,
      };

      const endpoint = endpoints[modal.node.type];
      if (endpoint) {
        await fetch(endpoint, { method: "DELETE" });
        fetchTreeData();
      }
      setModal(null);
    } catch (error) {
      console.error("Error archiving:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasProperty = treeData.length > 0;

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
            <Button onClick={() => setModal({ type: "property", mode: "create" })}>
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
        onEdit={handleEdit}
        onArchive={handleArchive}
        onReactivate={handleReactivate}
        onAddChild={handleAddChild}
      />

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

      {/* Gleba Modal */}
      <Modal
        isOpen={modal?.type === "gleba"}
        onClose={() => setModal(null)}
        title={modal?.mode === "edit" ? "Editar Gleba" : "Nova Gleba"}
        showConfirm={false}
      >
        <GlebaForm
          initialData={
            modal?.mode === "edit" && modal.node
              ? {
                  name: modal.node.name,
                  area: modal.node.area || "",
                  notes: modal.node.notes || "",
                }
              : undefined
          }
          onSubmit={handleGlebaSubmit}
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
