import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Priority, Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import IssuesMenu from "../IssuesMenu";
import IssueTable, { columnNames, IssueQuery } from "../_components/IssueTable";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const availableStatuses = Object.values(Status);
  const availablePriorities = Object.values(Priority);
  const searchPhrase = searchParams.phrase || undefined;
  const validatedStatus = availableStatuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const validatePriorities = availablePriorities.includes(searchParams.priority)
    ? searchParams.priority
    : undefined;

  const page = parseInt(searchParams.page) || 1;

  const pageSize = parseInt(searchParams.count) || 10;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      title: {
        contains: searchPhrase,
      },
      status: validatedStatus,
      priority: validatePriorities,
    },
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({
    where: { status: validatedStatus, priority: validatePriorities },
  });

  return (
    <Flex gap="5" direction="column">
      <IssuesMenu />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Flex justify="end">
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={issueCount}
        />
      </Flex>
    </Flex>
  );
};
export default IssuesPage;
