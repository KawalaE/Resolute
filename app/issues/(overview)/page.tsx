import Pagination from "@/app/_utility_components/Pagination";
import prisma from "@/prisma/client";
import { Priority, Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import IssuesMenu from "../_components/IssuesMenu";
import IssueTable, { IssueQuery } from "../_components/IssueTable";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  try {
    const availableStatuses = Object.values(Status);
    const availablePriorities = Object.values(Priority);
    const searchPhrase = searchParams.phrase || undefined;
    const validatedStatus = availableStatuses.includes(searchParams.status)
      ? searchParams.status
      : undefined;

    const validatePriorities = availablePriorities.includes(
      searchParams.priority
    )
      ? searchParams.priority
      : undefined;

    const page = parseInt(searchParams.page) || 1;
    const pageSize = parseInt(searchParams.count) || 10;

    const orderBy = ["title", "status", "priority", "createdAt"].includes(
      searchParams.orderBy
    )
      ? { [searchParams.orderBy]: searchParams.sort }
      : undefined;

    const issues = await prisma.issue.findMany({
      where: {
        title: {
          contains: searchPhrase || undefined,
        },
        status: validatedStatus,
        priority: validatePriorities,
      },
      orderBy: orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const issueCount = await prisma.issue.count({
      where: {
        title: { contains: searchPhrase },
        status: validatedStatus,
        priority: validatePriorities,
      },
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
  } catch (error) {
    console.error("Error loading issues:", error);
    return <div>Error loading issues</div>; // Display error message
  }
};

export const metadata: Metadata = {
  title: "Resolute - Issues",
  description: `Browse all issues and easily filter by status, priority, or use the search bar for quick access.`,
};

export default IssuesPage;
