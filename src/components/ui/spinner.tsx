import { Loader2 } from "lucide-react";

type Props = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export function Spinner({ size = "md", className = "" }: Props) {
  return (
    <Loader2
      className={`animate-spin text-zinc-400 dark:text-zinc-500 ${sizeClasses[size]} ${className}`}
    />
  );
}

export function PageSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <Spinner size="lg" />
    </div>
  );
}
