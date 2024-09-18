"use client";
import { AlertDialog, Button, Flex, Spinner, TextArea } from "@radix-ui/themes";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const CommentIssue = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [commentContent, setCommentContent] = useState("");
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  };
  return (
    <>
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
          ></TextArea>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="green" onClick={addComment}>
                Add a comment
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default CommentIssue;
