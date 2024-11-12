import { CircleAlert } from "lucide-react";

type EmptyStateProps = {
  text?: string;
};

function EmptyState({ text }: EmptyStateProps) {
  return (
    <div
      className="flex items-center justify-center w-full gap-2 p-10 rounded-md bg-neutral-100"
      role="alert"
    >
      <CircleAlert className="text-neutral-300" /> {text && <p>{text}</p>}
    </div>
  );
}

export { EmptyState };
