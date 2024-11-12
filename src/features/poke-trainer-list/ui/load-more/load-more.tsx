import { Button } from "@/core/components/button";
import { Loader as LoaderIcon } from "lucide-react";

type LoadMoreProps = {
  loadMore: () => void;
  disabled: boolean;
  isLoadingMore: boolean;
};

function LoadMore({ loadMore, disabled, isLoadingMore }: LoadMoreProps) {
  return (
    <div className="flex items-center justify-center w-full mt-10">
      <Button onClick={loadMore} disabled={disabled}>
        {isLoadingMore && <LoaderIcon className="animate-spin" />} Load more
      </Button>
    </div>
  );
}

export { LoadMore };
