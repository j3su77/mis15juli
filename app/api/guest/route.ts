import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  try {
    const values = await req.json();

    if (!session) return new NextResponse("Unauthorized", { status: 401 });
    if (!values.invitationCode)
      return new NextResponse("Bad request", { status: 400 });

    const existingGuestCode = await db.guest.findFirst({
      where: { invitationCode: values.invitationCode, active: true },
    });

    if (existingGuestCode) {
      return new NextResponse("Código de invitación ya registrado", {
        status: 400,
      });
    }

    const guest = await db.guest.create({
      data: {
        ...values,
      },
    });

    return NextResponse.json(guest);
  } catch (error) {
    console.log("[GUEST-CREATED]", error);
    return new NextResponse("Internal Errorr" + error, { status: 500 });
  }
}
