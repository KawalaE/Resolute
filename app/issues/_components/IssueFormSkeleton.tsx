import { Skeleton } from "@/app/_utility_components";

const IssueFormSkeleton = () => {
  return (
    <div className="max-w-xl">
      <Skeleton height="1.5rem" className="mb-5" />
      <Skeleton height="20rem"></Skeleton>
      <Skeleton height="2rem" width="5rem" className="mt-10"></Skeleton>
    </div>
  );
};

export default IssueFormSkeleton;
