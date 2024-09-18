import authOptions from "@/app/auth/AuthOptions";
import { commentSchema } from "@/app/schemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    //401 - unauthorized
    return NextResponse.json({}, { status: 401 });
  }
  const body = await request.json();
  const validate = commentSchema.safeParse(body);

  if (!validate.success) {
    return NextResponse.json(validate.error.format(), { status: 400 });
  }

  const issue = await prisma.comment.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid comment" }, { status: 404 });
  }
  const updatedComment = await prisma.comment.update({
    where: { id: issue.id },
    data: {
      description: body.description,
    },
  });
  return NextResponse.json(updatedComment, { status: 201 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    //401 - unauthorized
    return NextResponse.json({}, { status: 401 });
  }
  const comment = await prisma.comment.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!comment) {
    return NextResponse.json({ error: "Invalid comment" }, { status: 404 });
  }

  await prisma.comment.delete({
    where: {
      id: parseInt(params.id),
    },
  });
  return NextResponse.json(comment, { status: 200 });
}
