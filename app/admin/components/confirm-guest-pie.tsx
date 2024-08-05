"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Guest } from "@prisma/client";

export const ConfirmedGuestsPie = ({ guests }: { guests: Guest[] }) => {

  const respondedGuests = guests.filter((guest) => guest.hasResponded);
  const attending = respondedGuests.filter((guest) => guest.confirmed).length;
  const notAttending = respondedGuests.length - attending;

  const chartData = [
    { status: "Asistirán", count: attending, fill: "hsl(var(--chart-1))" },
    {
      status: "No asistirán",
      count: notAttending,
      fill: "hsl(var(--chart-2))",
    },
  ];

  const chartConfig = {
    attending: {
      label: "Asistirán",
      color: "hsl(var(--chart-1))",
    },
    notAttending: {
      label: "No asistirán",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const totalGuests = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Confirmación de Asistencia</CardTitle>
        <CardDescription>
          Invitados que asistirán y no asistirán
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalGuests}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Invitados
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Total de invitados confirmados y no confirmados
        </div>
      </CardFooter>
    </Card>
  );
};
