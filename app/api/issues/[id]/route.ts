import authOptions from "@/app/auth/AuthOptions";
import { patchIssueSchema } from "@/app/schemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  // if (!session) {
  //   //401 - unauthorized
  //   return NextResponse.json({}, { status: 401 });
  // }
  const body = await request.json();
  const validate = patchIssueSchema.safeParse(body);

  if (!validate.success) {
    return NextResponse.json(validate.error.format(), { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  }

  const { assignedToUserId, title, description } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
  }

  if (body.comment) {
    await prisma.comment.create({
      data: {
        description: body.comment.description,
        assignToIssueId: issue.id,
        assignedToUserId: session?.user.id,
      },
    });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
      status: body.status ? body.status : "OPEN",
      priority: body.priority ? body.priority : "LOW",
    },
  });
  return NextResponse.json(updatedIssue, { status: 201 });
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
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  }
  await prisma.comment.deleteMany({
    where: { assignToIssueId: issue.id },
  });
  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json(issue, { status: 200 });
}
