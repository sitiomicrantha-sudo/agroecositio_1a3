"use client";

import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";
import { Cloud, Map, Calendar, TrendingUp } from "lucide-react";

const cards = [
  {
    title: "Clima",
    icon: Cloud,
    description: "Dados meteorológicos da propriedade",
  },
  {
    title: "Áreas Ativas",
    icon: Map,
    description: "Resumo das áreas em produção",
  },
  {
    title: "Atividades",
    icon: Calendar,
    description: "Próximas atividades programadas",
  },
  {
    title: "Produção",
    icon: TrendingUp,
    description: "Indicadores de produtividade",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">Dashboard</h1>
        <p className="text-stone-600">
          Visão geral da sua propriedade agroecológica
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <Card key={card.title} className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <card.icon className="text-green-600" size={24} />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="font-semibold text-stone-800">{card.title}</h3>
                  <p className="text-sm text-stone-500">{card.description}</p>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
