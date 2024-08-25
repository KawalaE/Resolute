import Link from "@/app/components/Link";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueBadge from "../components/IssueBadge";
import AddIssueButton from "./AddIssueButton";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <div>
      <AddIssueButton />
      <Table.Root variant="surface" className="max-w-xl">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
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
