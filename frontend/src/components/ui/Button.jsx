// "use client";

import { cn } from "../../lib/utils";

export default function Button({
  className,
  children,
  value,
  onclick,
  selected,
}) {
  return (
    <button
      className={cn(
        " cursor-pointer bg-blue-500  text-white font-semibold py-2 px-4 rounded-xl shadow-md",
        className
      )}
      onClick={onclick}
    >
      {children}
    </button>
  );
}
