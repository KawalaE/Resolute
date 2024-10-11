import { Metadata } from "next";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(
  () => import("@/app/issues/[id]/_components/IssueForm"),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
  }
);

const NewIssuePage = () => {
  return <IssueForm />;
};

export const metadata: Metadata = {
  title: "Resolute - New",
  description: `Create a new issue, set the priority, add a title,
   and include code snippets for a detailed description.`,
};

export default NewIssuePage;
