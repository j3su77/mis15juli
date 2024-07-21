import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const values = await req.json();

    console.log({ values });

    const { guestId, ...rest } = values;

    if (!guestId) return new NextResponse("Bad request", { status: 401 });

    const existingGuest = await db.guest.findUnique({
      where: { id: guestId, active: true },
    });

    if (!existingGuest) {
      return new NextResponse("Invitado no encontrado 😑", {
        status: 400,
      });
    }

    const guest = await db.guest.update({
      where: {
        id: guestId,
      },
      data: {
        ...rest,
        hasResponded: true,
      },
    });

    return NextResponse.json(guest);
  } catch (error) {
    console.log("[GET-GUEST]", error);
    return new NextResponse("Internal Errorr" + error, { status: 500 });
  }
}
