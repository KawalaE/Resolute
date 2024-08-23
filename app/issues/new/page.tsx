"use client";
import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";

interface NewIssueData {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const submitFormData = async (data: NewIssueData) => {
    await axios.post("/api/issues", data);
    router.push("/issues");
  };

  const { register, control, handleSubmit } = useForm<NewIssueData>();
  return (
    <form
      className="max-w-xl space-y-5"
      onSubmit={handleSubmit((data) => submitFormData(data))}
    >
      <TextField.Root placeholder="Title" {...register("title")} />
      <Controller
        control={control}
        name="description"
        render={({ field }) => <SimpleMDE {...field} />}
      />
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
