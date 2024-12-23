import authOptions from "@/app/auth/AuthOptions";
import { IssueSchema } from "@/app/schemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    //401 - unauthorized
    return NextResponse.json({}, { status: 401 });
  }
  const body = await request.json();
  const validate = IssueSchema.safeParse(body);

  if (!validate.success) {
    return NextResponse.json(validate.error.errors, { status: 400 });
  }

  const allIssuesCount = await prisma.issue.count();
  if (allIssuesCount >= 200) {
    return NextResponse.json(
      "Max amamount of issues reached, must be less then 200",
      {
        status: 400,
      }
    );
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
      priority: body.priority ? body.priority : "LOW",
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
