"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const initialHeight = 24; // Initial height in pixels
const maxHeight = initialHeight * 4; // Maximum height (4 times the initial height)

type Props = {
  onClick: (text: string) => void;
};

export function ExpandableInput(props: Props) {
  const [value, setValue] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const handleClick = () => {
    props.onClick(value);
    setValue("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      props.onClick(value);
      setValue("");
    }
  };

  return (
    <div className="w-full">
      <div
        id="this-id"
        className="w-full rounded-[26px] bg-gray-200 dark:bg-gray-800 overflow-hidden py-3 pl-6 pr-3 gap-3 flex justify-between items-center"
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Message Chrome AI"
          className="resize-none bg-inherit focus:outline-none flex-grow"
          style={{
            minHeight: `${initialHeight}px`,
            maxHeight: `${maxHeight}px`,
          }}
        />
        <Button
          variant="ghost"
          className="h-8 w-8 px-0 rounded-full flex-shrink-0 self-end bg-gray-400 dark:bg-gray-600"
          onClick={handleClick}
        >
          <ArrowUp className="text-gray-100" size={20} />
        </Button>
      </div>
    </div>
  );
}
