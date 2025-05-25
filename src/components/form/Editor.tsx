"use client";

import { Textarea } from "@/components/ui/textarea";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function Editor({ value, onChange, placeholder }: EditorProps) {
  // This is a simple editor - in a real app you would use a rich text editor
  // like TipTap, Lexical, or QuillJS
  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="min-h-[400px] font-mono"
    />
  );
}
