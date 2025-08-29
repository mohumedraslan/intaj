"use client";

import * as React from "react";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", rows = 6, ...props }, ref) => {
    const classes = `flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:cursor-not-allowed disabled:opacity-50 ${className}`;
    return <textarea ref={ref} className={classes} rows={rows} {...props} />;
  }
);

Textarea.displayName = "Textarea";

export default Textarea;


