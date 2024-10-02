"use client";
import {
  AlertDialog,
  Button,
  Flex,
  Grid,
  Spinner,
  Text,
  TextArea,
} from "@radix-ui/themes";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const CommentIssue = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [commentContent, setCommentContent] = useState("");
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  let currentChars = 500 - commentContent.length;
  const addComment = async () => {
    try {
      setIsSubmitting(true);
      await axios.post(`/api/issues/${issueId}/comments`, {
        description: commentContent,
      });
      toast.success("Your comment was posted");
      router.push(`/issues/${issueId}`);
      setIsSubmitting(false);
      router.refresh();
    } catch {
      toast.error("An unexpected error occured");
      setError(true);
      setIsSubmitting(false);
    }
    setCommentContent("");
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="gray" className="p-3" disabled={isSubmitting}>
          Comment on an Issue
          {isSubmitting && <Spinner />}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Comment on an Issue</AlertDialog.Title>

        <TextArea
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Your comment..."
          value={commentContent}
        ></TextArea>

        <Flex direction="column" className="mt-4">
          <Grid
            columns={{ initial: "1", sm: "3" }}
            gap="4"
            className="mb-4"
            dir="rtl"
          >
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="green"
                onClick={addComment}
                disabled={!commentContent.trim() || commentContent.length > 500}
              >
                Add a comment
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

export default CommentIssue;
