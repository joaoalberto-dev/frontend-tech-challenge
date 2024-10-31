import { ReactNode } from "react";

type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  containerClassName?: string;
};

function List<T = unknown>({
  items,
  renderItem,
  containerClassName = "",
}: ListProps<T>) {
  return (
    <div
      className={`w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:grid-cols-4 auto-rows-auto ${containerClassName}`}
    >
      {items.map((item) => {
        return renderItem(item);
      })}
    </div>
  );
}

export { List };
