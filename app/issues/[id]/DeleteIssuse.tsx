import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

const DeleteIssuse = ({ issueId }: { issueId: number }) => {
  return (
    <Button color="red" className="p-3">
      <TrashIcon />
      Delete an issue
    </Button>
  );
};

export default DeleteIssuse;
