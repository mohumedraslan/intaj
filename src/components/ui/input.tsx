"use client";

import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", autoComplete, ...props }, ref) => {
    const classes = `flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:cursor-not-allowed disabled:opacity-50 ${className}`;
    // Remove fdprocessedid if present, without using 'any' or unused variable
    const safeProps = { ...props };
    if ('fdprocessedid' in safeProps) {
      delete (safeProps as Record<string, unknown>).fdprocessedid;
    }
    // Only set autoComplete if defined and valid
    return <input ref={ref} className={classes} {...(autoComplete ? { autoComplete } : {})} {...safeProps} />;
  }
);

Input.displayName = "Input";

export default Input;


