import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});
const EditPage = async ({ params }: { params: { id: string } }) => {
  //fetch data from db
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params?.id) },
  });
  if (!issue) notFound();
  return (
    <Flex justify="center">
      <IssueForm issue={issue} />
    </Flex>
  );
};

export default EditPage;
