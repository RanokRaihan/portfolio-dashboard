/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Control, useController } from "react-hook-form";

type SingleImageUploadProps = {
  name: string;
  control: Control<any>;
  label?: string;
};

export function SingleImageUpload({
  name,
  control,
  label,
}: SingleImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  // Handle file selection
  const handleFile = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    onChange(files[0]);
  };

  // Clear selected image
  const handleRemove = () => {
    onChange(null);
  };

  return (
    <div>
      {label && <label className="block mb-2 font-medium">{label}</label>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files)}
      />
      <div className="flex flex-col gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          className="w-full"
        >
          {value ? "Change Image" : "Upload Image"}
        </Button>

        {error && <div className="text-sm text-red-500">{error.message}</div>}

        {value && (
          <Card className="relative w-full max-w-md h-64 p-2 flex flex-col items-center justify-center">
            <Image
              src={URL.createObjectURL(value)}
              alt="Selected image"
              fill
              className="object-contain rounded p-4"
              onLoad={(e) =>
                URL.revokeObjectURL((e.target as HTMLImageElement).src)
              }
            />
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
