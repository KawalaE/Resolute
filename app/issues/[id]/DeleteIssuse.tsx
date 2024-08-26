"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteIssuse = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const deleteIssue = async () => {
    await axios.delete(`/api/issues/${issueId}`);
    router.push("/issues");
    router.refresh();
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" className="p-3">
          <TrashIcon />
          Delete an issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Delete an Issue</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? This action will permanently remove an issue and any
          data related to it.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={deleteIssue}>
              Delete an issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssuse;
