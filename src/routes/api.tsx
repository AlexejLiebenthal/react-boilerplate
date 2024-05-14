import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { jsonPlaceholderOptions } from "@/lib/api";

function ApiComponent() {
  const { data: todos } = useSuspenseQuery({ ...jsonPlaceholderOptions, select: (data) => data.slice(10) });

  return (
    <div>
      <Button asChild variant="link">
        <Link to="/">Go Home</Link>
      </Button>
      <ul>
        {todos.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const Route = createFileRoute("/api")({
  component: ApiComponent,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(jsonPlaceholderOptions),
  pendingComponent: Loader,
});
