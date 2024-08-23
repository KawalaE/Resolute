"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoInformationCircleOutline } from "react-icons/io5";
import SimpleMDE from "react-simplemde-editor";

interface NewIssueData {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState(false);

  const submitFormData = async (data: NewIssueData) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const { register, control, handleSubmit } = useForm<NewIssueData>();
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
        className=" space-y-5"
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
    </div>
  );
};

export default NewIssuePage;
