"use client";
import { Comment, User } from "@prisma/client";
import { Pencil1Icon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  Button,
  Flex,
  Grid,
  Text,
  TextArea,
} from "@radix-ui/themes";
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
  let currentChars = 500 - commentContent.length;

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
          aria-label="update-btn"
          color="gray"
          className="p-1"
          variant="soft"
          disabled={author!.id !== session?.user?.id}
        >
          <Pencil1Icon />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content aria-describedby={undefined}>
        <AlertDialog.Title>Edit comment</AlertDialog.Title>
        <TextArea
          onChange={(e) => setCommentContent(e.target.value)}
          value={commentContent}
        ></TextArea>
        <Flex direction="column" className="mt-4">
          <Grid
            columns={{ initial: "1", sm: "3" }}
            gap="4"
            className="mb-4"
            dir="rtl"
          >
            {" "}
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="green"
                disabled={currentChars <= 0}
                onClick={() => updateComment(currentComment)}
              >
                Update a comment
              </Button>
            </AlertDialog.Action>
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
          </Grid>
          <Text size="3" color={currentChars > 0 ? "green" : "red"}>
            Characters left: {currentChars > 0 ? currentChars : 0}
          </Text>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default UpdateComment;
