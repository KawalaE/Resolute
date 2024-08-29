import { IssueBadge } from "@/app/components";
import Link from "@/app/components/Link";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { Flex, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import IssuesMenu from "../IssuesMenu";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const availableStatuses = Object.values(Status);
  const validatedStatus = availableStatuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const issues = await prisma.issue.findMany({
    where: { status: validatedStatus },
  });
  //here fix here fix here
  const columnHeaders: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Title", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];
  return (
    <div>
      <IssuesMenu />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columnHeaders.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                <Flex align="center" gap="1">
                  <NextLink
                    href={{
                      query: { ...searchParams, orderBy: column.value },
                    }}
                  >
                    {column.label}
                  </NextLink>
                  {column.value === searchParams.orderBy && <ArrowDownIcon />}
                </Flex>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`issues/${issue.id}`} label={issue.title} />

                <div className="block md:hidden">
                  {" "}
                  <IssueBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
export default IssuesPage;
