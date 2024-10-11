"use client";
import { IssueBadge, Link } from "@/app/_utility_components";
import { PriorityBadge } from "@/app/_utility_components/PriorityBadge";
import { Issue, Priority, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Flex, Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface IssueQuery {
  priority: Priority;
  status: Status;
  orderBy: keyof Issue;
  page: string;
  count: string;
  phrase: string;
  direction: string;
  sort: "asc" | "desc";
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState("asc");

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columnHeaders.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <Flex align="center" gap="2">
                <button
                  onClick={() => {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    const { count, priority, status, phrase } = searchParams;
                    const params = new URLSearchParams();

                    const possibleParams = { count, priority, status, phrase };
                    Object.entries(possibleParams).forEach(([key, value]) => {
                      if (value) params.append(key, value);
                    });

                    params.append("orderBy", column.value);
                    params.append("sort", sortOrder);

                    const query = params.size ? "?" + params.toString() : "";
                    router.push("/issues" + query);
                  }}
                >
                  {column.label}
                </button>
                {column.value === searchParams.orderBy &&
                  (sortOrder === "asc" ? <ArrowDownIcon /> : <ArrowUpIcon />)}
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
  {
    label: "Status",
    value: "status",
    className: "hidden md:table-cell",
  },
  { label: "Priority", value: "priority", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columnHeaders.map((column) => column.value);
export default IssueTable;
