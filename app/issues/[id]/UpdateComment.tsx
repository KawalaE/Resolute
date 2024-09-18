"use client";
import { Comment, User } from "@prisma/client";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, TextArea } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  author: User;
  currentComment: Comment;
  updateComment: (comment: Comment, commentUpdate: string) => void;
}

const UpdateComment = ({ author, currentComment }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState(false);

  const [commentContent, setCommentContent] = useState(
    currentComment.description
  );
  const updateComment = async (currentComment: Comment) => {
    try {
      await axios.patch(`/api/comments/${currentComment.id}`, {
        description: commentContent,
      });
      router.refresh();
      toast.success("Comment was updated");
    } catch {
      setError(true);
      toast.error("An unexpected issue occured");
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button
          color="gray"
          className="p-1"
          variant="soft"
          disabled={author!.id !== session?.user?.id}
        >
          <Pencil1Icon />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Edit comment</AlertDialog.Title>
        <TextArea
          onChange={(e) => setCommentContent(e.target.value)}
          value={commentContent}
        ></TextArea>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="green"
              onClick={() => updateComment(currentComment)}
            >
              Update a comment
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default UpdateComment;
