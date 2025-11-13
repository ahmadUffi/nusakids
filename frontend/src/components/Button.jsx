import { cn } from "../lib/utils";

export default function Button({
  className,
  children,
  value,
  onclick,
  selected,
  ...props
}) {
  return (
    <button
      className={cn(
        "cursor-pointer bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95",
        selected && "bg-blue-700 ring-2 ring-blue-300",
        className
      )}
      onClick={onclick}
      {...props}
    >
      {children}
    </button>
  );
}
