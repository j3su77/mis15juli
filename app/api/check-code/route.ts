import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  try {
    const values = await req.json();
    // if (!session) return new NextResponse("Unauthorized", { status: 401 })
    if (!values.invitationCode) return new NextResponse("Bad request", { status: 400 });

    const existingGuest = await db.guest.findUnique({
      where: { invitationCode: values.invitationCode, active: true },
    });

    if (!existingGuest) {
      return new NextResponse("Invitado no encontrado 😑", {
        status: 400,
      });
    }

    return NextResponse.json(existingGuest);
  } catch (error) {
    console.log("[GET-GUEST]", error);
    return new NextResponse("Internal Errorr" + error, { status: 500 });
  }
}
