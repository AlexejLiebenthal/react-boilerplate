import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

function Index() {
  return (
    <>
      <div className="p-2">Hello from Home!</div>
      <Button asChild variant="link">
        <Link preload="intent" to="/api">
          API
        </Link>
      </Button>
    </>
  );
}

export const Route = createLazyFileRoute("/")({
  component: Index,
});
