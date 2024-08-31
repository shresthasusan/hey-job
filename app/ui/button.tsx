import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  success?: boolean;
}

export function Button({ children, className, success, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "flex h-10 items-center rounded-lg  px-4 text-sm font-medium   transition-colors  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        className,
        {
          " bg-primary-600 focus-visible:outline-primary-500 active:bg-primary-500 ":
            !success,
          "bg-sucess-600 focus-visible:outline-sucess-500 active:bg-sucess-500":
            success,
        }
      )}
    >
      {children}
    </button>
  );
}
