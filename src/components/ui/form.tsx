"use client";

import * as React from "react";
import { FormProvider, UseFormReturn, FieldValues, Path } from "react-hook-form";

export function Form({ children, ...props }: React.ComponentProps<typeof FormProvider>) {
  return <FormProvider {...props}>{children}</FormProvider>;
}

export function FormField<TFieldValues extends FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>({
  name,
  control,
  render,
}: {
  name: TName;
  control: UseFormReturn<TFieldValues>["control"];
  render: (props: { field: ReturnType<UseFormReturn<TFieldValues>["register"]> }) => React.ReactNode;
}) {
  const { register } = control as unknown as UseFormReturn<TFieldValues>;
  const field = register(name);
  return <>{render({ field })}</>;
}

export function FormItem({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`flex flex-col gap-2 ${className}`} {...props} />;
}

export function FormLabel({ className = "", ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={`text-sm font-medium ${className}`} {...props} />;
}

export function FormControl({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props} />;
}

export function FormDescription({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`text-xs text-gray-500 ${className}`} {...props} />;
}

export function FormMessage({ className = "", children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`text-xs text-red-600 ${className}`} {...props}>
      {children}
    </p>
  );
}


