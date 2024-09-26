import prisma from "@/prisma/client";
import delay from "delay";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});
const EditPage = async ({ params }: { params: { id: string } }) => {
  //fetch data from db
  await delay(2000);
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params?.id) },
  });
  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};

export default EditPage;
