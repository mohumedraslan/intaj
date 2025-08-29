"use client";

import * as React from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

export function Form({ children, ...props }: React.ComponentProps<typeof FormProvider>) {
  return <FormProvider {...props}>{children}</FormProvider>;
}

export function FormField<TFieldValues, TName extends string = string>({
  name,
  control,
  render,
}: {
  name: TName;
  control: UseFormReturn<TFieldValues>["control"];
  render: (props: { field: any }) => React.ReactNode;
}) {
  const { register } = control as unknown as UseFormReturn<any>;
  const field = register(name as any);
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


