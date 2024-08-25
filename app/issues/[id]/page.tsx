import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  if (isNaN(parseInt(params.id))) notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    notFound();
  }
  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.status}</p>
      <p>{issue.description}</p>
    </div>
  );
};

export default page;
