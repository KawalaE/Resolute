import authOptions from "@/app/auth/AuthOptions";
import { commentSchema } from "@/app/schemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
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
    return NextResponse.json(validate.error.errors, { status: 400 });
  }
  const allCommentsCount = await prisma.comment.count();
  if (allCommentsCount >= 200) {
    return NextResponse.json(
      "Max amamount of comments reached, must be less then 200",
      {
        status: 400,
      }
    );
  }
  const commentsPerUser = await prisma.comment.count({
    where: {
      assignedToUserId: session.user.id,
    },
  });
  if (commentsPerUser >= 30) {
    return NextResponse.json(
      "Max amamount of comments reached, must be less then 20 per user",
      {
        status: 400,
      }
    );
  }

  const newComment = await prisma.comment.create({
    data: {
      description: body.description,
      assignedToUserId: session.user!.id!,
      assignToIssueId: parseInt(params.id),
    },
  });
  return NextResponse.json(newComment, { status: 201 });
}
