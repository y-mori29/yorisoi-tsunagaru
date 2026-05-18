import type { HTMLAttributes, ReactNode } from "react";

type CardVariant = "default" | "quiet" | "bordered";

type CardProps = {
  variant?: CardVariant;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function Card({ variant = "default", children, className = "", ...rest }: CardProps) {
  const variantClass = variant !== "default" ? `card--${variant}` : "";
  const classes = `card ${variantClass} ${className}`.trim();

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
