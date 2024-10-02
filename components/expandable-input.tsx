"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExpandableInput() {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const initialHeight = 40; // Initial height in pixels
  const maxHeight = initialHeight * 4; // Maximum height (4 times the initial height)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${initialHeight}px`;
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(
        scrollHeight,
        maxHeight
      )}px`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="relative w-full">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder="Message Chrome AI"
        className="w-full px-6 py-3.5 text-white bg-gray-800 rounded-[26px] resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ minHeight: `${initialHeight}px`, maxHeight: `${maxHeight}px` }}
      />
      <Button className="h-8 w-8 px-0 absolute right-3 bottom-[18px] rounded-full">
        <ChevronUpIcon className="  text-gray-400" size={20} />
      </Button>
    </div>
  );
}
