import { Flex } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return (
    <Flex justify="center">
      <IssueForm />
    </Flex>
  );
};

export default NewIssuePage;
