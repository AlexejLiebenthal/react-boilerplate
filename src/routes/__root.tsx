import { lazy, Suspense } from "react";

import { type QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";

import { Loader } from "@/components/loader";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => <></> // Render nothing in production
  : lazy(() =>
      // Lazy load in development
      import("@tanstack/router-devtools").then((resolve) => ({
        default: resolve.TanStackRouterDevtools,
      })),
    );

function RootComponent() {
  useTheme();
  return (
    <>
      <nav className="fixed inset-0 z-30 flex h-16 items-center gap-2 bg-background p-2 shadow-lg">
        <figure className="size-10 shrink-0">
          <img src="/vite.svg" alt="Logo" />
        </figure>
        <h1 className="grow text-base font-bold tracking-tight brightness-90 dark:brightness-100 sm:text-2xl">
          React-Boilerplate
        </h1>
        <div className="flex shrink-0 gap-2">
          <Button asChild variant="link">
            <Link to="/">Home</Link>
          </Button>
          <Button asChild variant="link">
            <Link to="/about">About</Link>
          </Button>
          <ModeToggle />
        </div>
      </nav>
      <main className="pt-14">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <div>
        <ReactQueryDevtools />
        <TanStackRouterDevtools />
      </div>
    </>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});
