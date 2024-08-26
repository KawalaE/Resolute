import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditButton = ({ issueId }: { issueId: number }) => {
  return (
    <Link href={`/issues/${issueId}/edit`}>
      <Button>
        <Pencil1Icon />
        Edit an issue
      </Button>
    </Link>
  );
};

export default EditButton;
