import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";

const EditPage = async ({ params }: { params: { id: string } }) => {
  //fetch data from db
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params?.id) },
  });
  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};

export default EditPage;
