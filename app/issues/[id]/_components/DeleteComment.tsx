"use client";
import { Comment } from "@prisma/client";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  author: User;
  currentComment: Comment;
}

const DeleteComment = ({ author, currentComment }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState(false);
  const deleteComment = async (currentComment: Comment) => {
    try {
      await axios.delete(`/api/comments/${currentComment.id}`);
      router.refresh();
    } catch {
      setError(true);
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button
          color="gray"
          className="p-1"
          variant="soft"
          aria-label="delete-btn"
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
