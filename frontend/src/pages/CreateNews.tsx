import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { API_ENDPOINTS, API_URL } from "@/constants/api";

import { NewsAlerts } from "@/components/news-alerts";

const formNewSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  content: z.string().min(20, {
    message: "Content must be at least 20 characters.",
  }),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Date must be a valid date string.",
  }),
  author: z.string().min(2, {
    message: "Author must be at least 2 characters.",
  }),
});

export const CreateNews = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formNewSchema>>({
    resolver: zodResolver(formNewSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      date: "",
      author: "",
    },
  });

  function onSubmit(values: z.infer<typeof formNewSchema>) {
    const { title, description, content, date, author } = values;
    fetch(`${API_URL}${API_ENDPOINTS().CREATE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        content,
        date: new Date(date).toISOString(),
        author,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create news");
        }
        setAlertMessage("News created successfully");
        setShowAlert(true);
        setTimeout(() => {
          navigate("/news");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error:", error);
        setAlertMessage("Error creating news");
        setShowAlert(true);
      });
  }
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Create New</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-md justify-center mx-auto mb-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormDescription>
                  This is title of the news article.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormDescription>
                  A brief description of the news.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Input placeholder="Content" {...field} />
                </FormControl>
                <FormDescription>
                  The main content of the news article.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    placeholder="YYYY-MM-DDTHH:MM:SSZ"
                    {...field}
                  />
                </FormControl>
                <FormDescription>The date of the news article.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Author Name" {...field} />
                </FormControl>
                <FormDescription>
                  The name of the author of the news article.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Create News
          </Button>
        </form>
      </Form>
      {showAlert && (
        <NewsAlerts
          message={alertMessage}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      )}
    </>
  );
};
