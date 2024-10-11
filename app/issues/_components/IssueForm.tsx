"use client";
import { ErrorMessage } from "@/app/_utility_components";
import IssueBadge from "@/app/_utility_components/IssueBadge";
import { PriorityBadge } from "@/app/_utility_components/PriorityBadge";
import { IssueSchema } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue, Priority, Status } from "@prisma/client";
import {
  Button,
  Callout,
  Flex,
  Select,
  Spinner,
  TextField,
} from "@radix-ui/themes";
import MarkdownEditor from "@uiw/react-markdown-editor";
import axios from "axios";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoInformationCircleOutline } from "react-icons/io5";

import { z } from "zod";
type IssueFormData = z.infer<typeof IssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const statusOptions = Object.values(Status);
  const priorityOptions = Object.values(Priority);
  const [error, setError] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const { resolvedTheme } = useTheme();
  const submitFormData = async (data: IssueFormData) => {
    try {
      setSubmitting(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError(true);
    }
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5" color="red">
          <Callout.Icon>
            <IoInformationCircleOutline />
          </Callout.Icon>
          <Callout.Text>An unexpected error has occured</Callout.Text>
        </Callout.Root>
      )}

      <form
        className="space-y-5"
        onSubmit={handleSubmit((data) => submitFormData(data))}
      >
        <div>
          <TextField.Root
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>

        <Flex gap="5">
          {issue && (
            <Controller
              defaultValue={issue?.status}
              control={control}
              name="status"
              render={({ field: { onChange, value } }) => (
                <Select.Root defaultValue={value} onValueChange={onChange}>
                  <Select.Trigger placeholder="Status" />
                  <Select.Content variant="soft">
                    <Select.Group>
                      {statusOptions.map((status) => {
                        return (
                          <Select.Item key={status} value={status}>
                            <IssueBadge status={status} />
                          </Select.Item>
                        );
                      })}
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              )}
            ></Controller>
          )}
          <Controller
            defaultValue={issue?.priority}
            control={control}
            name="priority"
            render={({ field: { onChange, value } }) => (
              <Select.Root defaultValue={value} onValueChange={onChange}>
                <Select.Trigger placeholder="Priority" />
                <Select.Content variant="soft">
                  <Select.Group>
                    {priorityOptions.map((priority) => {
                      return (
                        <Select.Item key={priority} value={priority}>
                          <PriorityBadge priority={priority} />
                        </Select.Item>
                      );
                    })}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            )}
          ></Controller>
        </Flex>

        <div data-color-mode={resolvedTheme}>
          <Controller
            defaultValue={issue?.description}
            control={control}
            name="description"
            render={({ field }) => (
              // <SimpleMDE placeholder="Description"  />
              <MarkdownEditor
                height="300px"
                placeholder={"Description"}
                {...field}
              />
            )}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>

        <Button disabled={isSubmitting}>
          {issue ? "Update the Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
