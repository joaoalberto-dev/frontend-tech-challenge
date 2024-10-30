import { CircleAlert } from "lucide-react";

type EmptyStateProps = {
  text?: string;
};

function EmptyState({ text }: EmptyStateProps) {
  return (
    <div className="w-full flex gap-2 bg-neutral-100 p-10 items-center justify-center rounded-md">
      <CircleAlert className="text-neutral-300" /> {text && <p>{text}</p>}
    </div>
  );
}

export { EmptyState };
