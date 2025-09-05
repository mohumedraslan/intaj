"use client";

import * as React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-black text-white hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/20 disabled:opacity-50",
  secondary:
    "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50",
  outline:
    "border border-gray-300 text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50",
  ghost:
    "text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-8 px-3 text-sm rounded-md",
  md: "h-10 px-4 text-sm rounded-md",
  lg: "h-11 px-6 text-base rounded-md",
  icon: "h-10 w-10",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "md", ...props }, ref) => {
    const classes = `${sizeClasses[size]} ${variantClasses[variant]} inline-flex items-center justify-center whitespace-nowrap transition-colors ${className}`;
    // Remove fdprocessedid if present, without using 'any' or unused variable
    const safeProps = { ...props };
    if ('fdprocessedid' in safeProps) {
      delete (safeProps as Record<string, unknown>).fdprocessedid;
    }
    return <button ref={ref} className={classes} {...safeProps} />;
  }
);

Button.displayName = "Button";

export default Button;
