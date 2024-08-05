"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Guest } from "@prisma/client";

export const RelationShipGuestsBar = ({ guests }: { guests: Guest[] }) => {
  // const respondedGuests = guests.filter((guest) => guest.hasResponded);

  const relationshipCounts = guests.reduce((acc, guest) => {
    acc[guest.relationship] = (acc[guest.relationship] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const relationshipChartData = Object.keys(relationshipCounts).map(
    (relationship) => ({
      relationship,
      "#": relationshipCounts[relationship],
    })
  );

  return (
    <div className="flex flex-col gap-6 w-full">
      
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Invitados por Parentesco</CardTitle>
          <CardDescription>
            Distribución de los invitados por tipo de parentesco
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={relationshipChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="relationship" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="#" fill="hsl(var(--chart-1))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
