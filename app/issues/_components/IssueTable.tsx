import { IssueBadge, Link } from "@/app/components";
import { PriorityBadge } from "@/app/components/PriorityBadge";
import { Issue, Priority, Status } from "@prisma/client";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { Flex, Table } from "@radix-ui/themes";

import NextLink from "next/link";

export interface IssueQuery {
  priority: Priority;
  status: Status;
  orderBy: keyof Issue;
  page: string;
  count: string;
  phrase: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columnHeaders.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
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
              <div className="block md:hidden mt-1">
                <Flex gap="3">
                  <IssueBadge status={issue.status} />
                  <PriorityBadge priority={issue.priority} />
                </Flex>
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <PriorityBadge priority={issue.priority} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columnHeaders: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Priority", value: "priority", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columnHeaders.map((column) => column.value);
export default IssueTable;
