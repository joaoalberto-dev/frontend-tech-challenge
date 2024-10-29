import { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonProps = Partial<ButtonHTMLAttributes<HTMLButtonElement>> & {
  children: ReactNode;
  disabled: boolean;
  onClick: () => void;
};

function Button({ children, disabled, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className={`text-white flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
        disabled && "cursor-not-allowed opacity-50"
      }`}
    >
      {children}
    </button>
  );
}

export { Button };
