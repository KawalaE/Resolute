"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { User } from "next-auth";
import { useSession } from "next-auth/react";

interface Props {
  author: User;
  currentComment: Comment;
  deleteComment: (comment: Comment) => void;
}
const DeleteComment = ({ author, currentComment, deleteComment }: Props) => {
  const { data: session } = useSession();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button
          color="gray"
          className="p-1"
          variant="soft"
          disabled={author!.id !== session?.user?.id}
        >
          <TrashIcon />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Delete comment</AlertDialog.Title>

        <AlertDialog.Description size="3">
          Are you sure you want to delete your comment forever?
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              onClick={() => deleteComment(currentComment)}
            >
              Delete this comment
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteComment;
