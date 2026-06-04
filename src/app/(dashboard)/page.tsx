"use client";

import Card from "@/components/ui/Card";
import { Cloud, Calendar, TrendingUp } from "lucide-react";
import AreaOverviewCard from "@/components/dashboard/AreaOverviewCard";

const otherCards = [
  {
    title: "Clima",
    icon: Cloud,
    description: "Dados meteorológicos da propriedade",
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
        <AreaOverviewCard />

        {otherCards.map((card) => (
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
                  <div className="h-4 w-full bg-stone-100 rounded" />
                  <div className="h-4 w-3/4 bg-stone-100 rounded" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
