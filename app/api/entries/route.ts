import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { entryInputSchema } from "@/lib/zodSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request : NextRequest) {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = 10;

  try {
    const res = await prisma.entry.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({ res, hasMore: res.length === limit }, { status: 200 });
  } catch (error) {
    console.error("Error getting entries:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



export async function POST (request: NextRequest){

    const session = await getServerSession(NEXT_AUTH_CONFIG);
    if(!session) {
        return NextResponse.json({message: "unauthorized"}, {status: 403});
    }

    const body = await request.json();
    const { success } = entryInputSchema.safeParse(body);

    if(!success) {
        return NextResponse.json({message: "invalid inputs"}, {status: 422});
    }

    try {
         await prisma.entry.create({
          data: {
            userId:  session.user.id, 
            content: body.content,
            prompt:  body.prompt,
            color:   body.color
          },
        });
    
        return NextResponse.json({message: "entry created"}, { status: 201 });
      } catch (error) {
        console.error("Error creating entry:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
      };
};


export async function DELETE (request: NextRequest) {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if(!session || !session?.user?.id) {
    return NextResponse.json({message: "unauthorized"}, {status: 401});
  };
  const body = await request.json();

  try {
    await prisma.entry.delete({where: {id:body.id, userId: session?.user?.id}});

   return NextResponse.json({message: "entry created"}, { status: 201 });
 } catch (error) {
   console.error("Error deleting entry:", error);
   return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
 };

};

export async function PUT (request: NextRequest) {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if(!session) {
    return NextResponse.json({message: "unauthorized"}, {status: 401});
  }

  const body = await request.json();
  const { success } = entryInputSchema.safeParse(body);

  if(!success) {
    return NextResponse.json({msg: "invalid inputs"}, {status: 422});
  }

  try {
    await prisma.entry.update({where: {id: body.id, userId: session?.user?.id},
       data: {prompt: body.prompt, content: body.content, color: body.color}
      });

   return NextResponse.json({message: "entry updated"}, { status: 201 });
 } catch (error) {
   console.error("Error updating entry:", error);
   return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
 };


};