/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Control, useController } from "react-hook-form";

type MultipleImageUploadProps = {
  name: string;
  control: Control<any>;
  label?: string;
};

export function MultipleImageUpload({
  name,
  control,
  label,
}: MultipleImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    field: { value = [], onChange },
    fieldState: { error },
  } = useController({ name, control });

  // Handle file selection
  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const fileArr = Array.from(files);
    // Prevent duplicates by name+size
    const newFiles = fileArr.filter(
      (file) =>
        !value.some((f: File) => f.name === file.name && f.size === file.size)
    );
    onChange([...value, ...newFiles]);
  };

  // Remove image by index
  const handleRemove = (idx: number) => {
    const newArr = value.filter((_: File, i: number) => i !== idx);
    onChange(newArr);
  };

  return (
    <div>
      {label && <label className="block mb-2 font-medium">{label}</label>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
        className="mb-4"
      >
        Upload Images
      </Button>
      {error && (
        <div className="text-sm text-red-500 mb-2">{error.message}</div>
      )}
      <div className="flex flex-wrap gap-4">
        {value &&
          value.map((file: File, idx: number) => {
            const url = URL.createObjectURL(file);
            return (
              <Card
                key={file.name + file.size}
                className="relative w-32 h-32 p-2 flex flex-col items-center justify-center"
              >
                <Image
                  src={url}
                  alt={file.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full rounded"
                  onLoad={() => URL.revokeObjectURL(url)}
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="absolute top-1 right-1"
                  onClick={() => handleRemove(idx)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
