"use client";
import { Comment, User } from "@prisma/client";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, TextArea } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface Props {
  author: User;
  currentComment: Comment;
  updateComment: (comment: Comment, commentUpdate: string) => void;
}

const UpdateComment = ({ author, currentComment, updateComment }: Props) => {
  const { data: session } = useSession();
  const [commentContent, setCommentContent] = useState(
    currentComment.description
  );

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
              onClick={() => updateComment(currentComment, commentContent)}
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