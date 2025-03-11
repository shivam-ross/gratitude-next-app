import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { prisma } from "@/lib/db";



export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {

    const { id } = await params;
    const entry = await prisma.entry.findUnique({
      where: { id},
    });

    if (!entry) return NextResponse.json({ message: "Not Found" }, { status: 404 });

    return NextResponse.json(entry, { status: 200 });
  } catch (error) {
    console.error("Error fetching entry:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

