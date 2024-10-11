import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { fetchIssue } from "../(overview)/page";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});
const EditPage = async ({ params }: { params: { id: string } }) => {
  const issue = await fetchIssue(parseInt(params.id));
  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};
export async function generateMetadata({ params }: { params: { id: string } }) {
  const issue = await fetchIssue(parseInt(params.id));
  return {
    title: `Edit ${issue?.title}`,
    description: `Edit ${issue?.title}`,
  };
}
export default EditPage;
