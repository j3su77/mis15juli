"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Guest } from "@prisma/client";

export const guestTableColumns: ColumnDef<Guest>[] = [
  {
    accessorKey: "firstName",
    accessorFn: (value) => value.firstName,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-secondary/30 hover:text-secondary-foreground text-xs"
        >
          Nombres
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original?.firstName;
      return <div className="">{name}</div>;
    },
  },
  {
    accessorKey: "lastName",
    accessorFn: (value) => value.lastName,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-secondary/30 hover:text-secondary-foreground text-xs"
        >
          Apellidos
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original?.lastName;
      return <div className="">{name}</div>;
    },
  },
  {
    accessorKey: "relationship",
    accessorFn: (value) => value.relationship,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-secondary/30 hover:text-secondary-foreground text-xs"
        >
          Parentesco
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original?.relationship;
      return <div className="">{name}</div>;
    },
  },
  {
    accessorKey: "invitationCode",
    accessorFn: (value) => value.invitationCode,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-secondary/30 hover:text-secondary-foreground text-xs"
        >
          Código
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original?.invitationCode;
      return <div className="">{name}</div>;
    },
  },
  {
    accessorKey: "confirmed",
    accessorFn: (value) =>  value.hasResponded ? value.confirmed ? "Sí" : "No" : "Pendiente",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-secondary/30 hover:text-secondary-foreground text-xs"
        >
          ¿Asistirá?
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original?.hasResponded ? row.original?.confirmed ? "Sí" : "No" : "Pendiente" 
      return <div className="">{name}</div>;
    },
  },
];
