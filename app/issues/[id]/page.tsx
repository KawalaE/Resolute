import IssueBadge from "@/app/components/IssueBadge";
import prisma from "@/prisma/client";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  if (isNaN(parseInt(params.id))) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", sm: "2" }} gap="2rem">
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap="4" my="2">
          <IssueBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Link href={`/issues/${params.id}/edit`}>
          <Button>
            <Pencil1Icon />
            Edit an issue
          </Button>
        </Link>
      </Box>
    </Grid>
  );
};

export default page;
