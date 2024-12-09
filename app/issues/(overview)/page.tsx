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

    const orderByClause = ["title", "status", "priority", "createdAt"].includes(
      searchParams.orderBy
    )
      ? { [searchParams.orderBy]: searchParams.sort }
      : undefined;

    const whereClause = {
      title: {
        contains: searchPhrase || undefined,
      },
      status: validatedStatus,
      priority: validatePriorities,
    };

    const [issues, issueCount] = await prisma.$transaction([
      prisma.issue.findMany({
        where: whereClause,
        orderBy: orderByClause,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.issue.count({ where: whereClause }),
    ]);

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
  openGraph: {
    title: "Resolute - Issues",
    description: `Browse all issues and easily filter by status, priority, or use the search bar for quick access.`,
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Resolute Issues Table",
      },
    ],
  },
};

export default IssuesPage;
