import { LoaderIcon } from "lucide-react";

export function Loader() {
  return (
    <div className="fixed inset-0 grid place-content-center">
      <LoaderIcon className="animate-spin" />
    </div>
  );
}
