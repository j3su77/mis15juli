import React from "react";
import { ConfirmedGuestsPie } from "./confirm-guest-pie";
import { db } from "@/lib/db";
import { RelationShipGuestsBar } from "./relationship-guest-bar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TableDefault } from "@/components/table-default";
import { guestTableColumns } from "../invitados/_components/guest-table-columns";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const IndicatorsContent = async () => {
  const guests = await db.guest.findMany({
    where: {
      active: true,
    },
  });
  const confirmedGuests = guests.filter((guest) => guest.hasResponded && guest.confirmed).length;
  const pendingGuests = guests.filter((guest) => !guest.hasResponded).length;
  return (
    <div className="flex flex-col p-2 min-h-screen">
        <h3 className="col-span-3 text-center text-3xl text-primary font-bold">
          Dashboard
        </h3>
      <div className="grid grid-cols-3 gap-3 justify-center my-4">

        <Card className="p-2">
          <h2 className="font-bold text-center">Total</h2>
          <span className=" block text-end text-xl">{guests.length}</span>
        </Card>
        <Card className="p-2">
          <h2 className="font-bold text-center">Confirmados</h2>
          <span className=" block text-end text-xl">{confirmedGuests}</span>
        </Card>
        <Card className="p-2">
          <h2 className="font-bold text-center">Pendientes</h2>
          <span className=" block text-end text-xl">{pendingGuests}</span>
        </Card>
      </div>
      <div className="flex gap-2 w-full flex-col md:flex-row">
        <ConfirmedGuestsPie guests={guests} />
        <RelationShipGuestsBar guests={guests} />
      </div>

      <Card className="mt-4">
        <CardHeader>
          <Link className={cn(buttonVariants({className: "bg-primary text-primary-foreground w-fit"}))} href={`/admin/invitados`}>Gestionar invitados</Link>
        </CardHeader>
        <CardContent>
          <TableDefault columns={guestTableColumns} data={guests} />
        </CardContent>
      </Card>
    </div>
  );
};
