"use client";

import { ExpandableInput } from "@/components/expandable-input";

export default function Home() {
  const handleClickInput = (text: string) => {
    console.log("🚀 ~ handleClickInput ~ text:", text);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="md:max-w-3xl mx-auto w-full flex-1 my-4 overflow-y-auto overflow-x-hidden">
        {Array(48)
          .fill(0)
          .map((_, i) => (
            <p key={i}>haha</p>
          ))}
      </div>
      <div className="md:max-w-3xl mx-auto w-full flex-shrink-0">
        <ExpandableInput onClick={handleClickInput} />
      </div>
    </div>
  );
}
