import { noop } from "@/core/utils/noop";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = Partial<ButtonHTMLAttributes<HTMLButtonElement>> & {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
};

function Button({
  children,
  onClick,
  disabled = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      onClick={disabled ? noop : onClick}
      type="button"
      className={`text-white relative flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 m-2 focus:outline-none ${
        disabled && "cursor-not-allowed bg-blue-300 hover:bg-blue-300"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export { Button };
