import { ModalLogout } from "@/app/auth/_components/modal-logout";
import { Flower } from "@/components/flower";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <nav className="relative flex items-center h-[20px] justify-between w-full">
    
  
      <div className=" flex justify-end ">
        {!session ? (
          <Link href={`/auth`}>
            <Flower h={20} w={20} r="0px" t="0px" />
          </Link>
        ) : (
          <div className="flex gap-1 items-center underline">
            <Link href={`/admin/invitados`} className="text-sm">
              invitados
            </Link>
            <ModalLogout />
          </div>
        )}
      </div>
    </nav>
  );
};
