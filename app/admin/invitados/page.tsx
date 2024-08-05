import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TableDefault } from "@/components/table-default";
import { guestTableColumns } from "./_components/guest-table-columns";

const GuestPage = async () => {
  const guests = await db.guest.findMany({
    where: {
      active: true,
    },
  });

  return (
    <Card className="m-3 min-h-screen">
      <CardHeader className="flex flex-row justify-between p-2 items-center">
        <Link className={cn(buttonVariants())} href={`/admin/`}>
          Regresar
        </Link>
        <h2 className="text-2xl text-primary font-bold">
          Listado de invitados
        </h2>
        <Link className={cn(buttonVariants())} href={`/admin/invitados/crear`}>
          Agregar
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div>
          Actualmente hay{" "}
          <span className="text-lg font-bold">{guests.length}</span>{" "}
          {guests.length == 1 ? "invitado" : "invitados"}.
        </div>

        <TableDefault
          data={guests}
          columns={guestTableColumns}
          editHref={{ btnText: "Editar", href: `/admin/invitados/editar` }}
        />
      </CardContent>
    </Card>
  );
};

export default GuestPage;
