import { MouseEvent } from "react";
import { Link } from "react-router-dom";

type CardProps = {
  id: string | number;
  name: string;
  image: string;
  kind: "link" | "button";
  cardClassName?: string;
} & (
  | {
      kind: "link";
      link: string;
      onClick?: never;
    }
  | {
      kind: "button";
      link?: never;
      onClick: (id: string | number) => void;
    }
);

function Card({
  id,
  name,
  image,
  link,
  onClick,
  kind,
  cardClassName = "",
}: CardProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (kind === "button" && onClick) {
      event.preventDefault();
      event.stopPropagation();

      onClick(id);
    }
  }

  return (
    <Link
      to={link || "/"}
      onClick={handleClick}
      key={id}
      className={`w-full aspect-square relative block rounded-lg overflow-hidden ${cardClassName}`}
    >
      <img
        src={image}
        className="absolute inset-0 object-cover w-full h-full bg-white"
      />
      <div className="absolute p-4 from-neutral-300 to-[50%] flex items-end text-white to-transparent bg-gradient-to-t inset-0 w-full bottom-0">
        <p className="text-xs font-bold">{name}</p>
      </div>
    </Link>
  );
}

export { Card };
