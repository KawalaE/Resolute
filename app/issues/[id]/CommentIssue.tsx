"use client";
import { AlertDialog, Button, Flex, TextArea } from "@radix-ui/themes";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CommentIssue = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [commentContent, setCommentContent] = useState("");
  const [error, setError] = useState(false);
  const addComment = async () => {
    try {
      await axios.patch(`/api/issues/${issueId}`, {
        comment: { description: commentContent, assignToIssueId: issueId },
      });
      router.push(`/issues/${issueId}`);
      router.refresh();
    } catch {
      setError(true);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="gray" className="p-3">
            Comment on an Issue
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
