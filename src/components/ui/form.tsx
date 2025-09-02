"use client";

import * as React from "react";
import {
  FormProvider,
  UseFormReturn,
  FieldValues,
  Path,
  Controller,
  ControllerProps,
  FieldPath,
} from "react-hook-form";

export function Form<TFieldValues extends FieldValues>({
  children,
  ...props
}: { children: React.ReactNode } & UseFormReturn<TFieldValues>) {
  return <FormProvider {...props}>{children}</FormProvider>;
}

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: ControllerProps<TFieldValues, TName>) {
  return <Controller {...props} />;
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
