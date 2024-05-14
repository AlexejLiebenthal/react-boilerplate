import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";

const todoSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

const todoListSchema = z.array(todoSchema);

export const jsonPlaceholderOptions = queryOptions({
  queryKey: ["jsonplaceholder"],
  queryFn: async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const json: unknown = await response.json();
    return todoListSchema.parse(json);
  },
});
