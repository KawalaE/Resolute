import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  openIssues: number;
  closedIssues: number;
  inProgressIssues: number;
}

const IssuesStats = async ({
  openIssues,
  closedIssues,
  inProgressIssues,
}: Props) => {
  const categories = [
    { value: "OPEN", label: "open", count: openIssues },
    { value: "CLOSED", label: "closed", count: closedIssues },
    { value: "IN_PROGRESS", label: "in progress", count: inProgressIssues },
  ];

  return (
    <Flex gap="5">
      {categories.map((category) => (
        <Card key={category.value}>
          <Flex direction="column" align="center" gap="2">
            <Link
              className="font-medium"
              href={`/issues?status=${category.value}`}
            >
              {category.label} {"Issues"}
            </Link>
            <Text size="5" weight="bold">
              {category.count}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssuesStats;
