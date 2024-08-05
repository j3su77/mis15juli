import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { guestId: string } }
) {
  const session = await getServerSession(authOptions);
  try {
    const values = await req.json();

    if (!session) return new NextResponse("Unauthorized", { status: 401 });
    if (!values.invitationCode)
      return new NextResponse("Bad request", { status: 400 });

    const existingGuest = await db.guest.findUnique({
      where: { id: params.guestId, active: true },
    });

    if (!existingGuest) {
      return new NextResponse("Invitado no encontrado", {
        status: 400,
      });
    }

    if (existingGuest.invitationCode !== values.invitationCode) {
      const existingGuestCode = await db.guest.findFirst({
        where: { invitationCode: values.invitationCode, active: true },
      });

      if (existingGuestCode) {
        return new NextResponse("Código de invitación ya registrado", {
          status: 400,
        });
      }
    }

    const guest = await db.guest.update({
      where: {
        id: params.guestId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(guest);
  } catch (error) {
    console.log("[GUEST-UPDATED]", error);
    return new NextResponse("Internal Errorr" + error, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { guestId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const { guestId } = params;

    if (!session) return new NextResponse("Unauthorized", { status: 401 });
    if (!guestId) return new NextResponse("Not Found", { status: 404 });

    const guestDeleted = await db.guest.update({
      where: {
        id: guestId,
      },
      data: {
        active: false,
      },
    });

    return NextResponse.json(guestDeleted);
  } catch (error) {
    console.log("[DELETED_ID_GUEST]", error);
    return new NextResponse("Internal Errorr " + error, { status: 500 });
  }
}
