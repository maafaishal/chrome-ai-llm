"use client";

import { useState, useRef } from "react";
import { CoreMessage, streamText } from "ai";
import { chromeai } from "chrome-ai";
import { marked } from "marked";
import htmr from "htmr";
import { ChromeIcon } from "lucide-react";

import { ExpandableInput } from "@/components/expandable-input";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<CoreMessage[]>([]);

  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClickInput = async (userMessage: string) => {
    const newMessages: CoreMessage[] = [
      ...messages,
      { role: "user" as const, content: userMessage },
    ];

    // add user message
    setMessages(newMessages);

    scrollToBottom();

    try {
      setLoading(true);

      const model = chromeai("text", {
        temperature: 0.5,
        topK: 5,
      });

      const { textStream } = await streamText({
        model,
        system:
          "You are a helpful assistant who will answer questions from users in detail.",
        messages: newMessages,
      });

      let result = "";

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: result,
        },
      ]);

      scrollToBottom();

      for await (const textPart of textStream) {
        result += textPart;

        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: result,
          },
        ]);

        scrollToBottom();
      }
    } catch (e) {
      console.error("e", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="md:max-w-3xl mx-auto w-full flex-1 my-4 overflow-y-auto overflow-x-hidden">
        {messages.map((msg, idx) => {
          const isUser = msg.role === "user";
          const isAssistant = msg.role === "assistant";

          const parsedText = marked.parse(msg.content as string) as string;

          if (isUser) {
            return (
              <div key={idx} className="flex justify-end mb-8">
                <div className="bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-[26px]">
                  {htmr(parsedText)}
                </div>
              </div>
            );
          }

          if (isAssistant) {
            return (
              <div className="flex gap-4 " key={idx}>
                <div className="flex-shrink-0">
                  <div
                    className="rounded-full w-9 h-9 flex justify-center items-center bg-white border border-gray-200 dark:border-gray-600 dark:bg-gray-600
"
                  >
                    <ChromeIcon
                      className="text-black dark:text-gray-200"
                      size={20}
                    />
                  </div>
                </div>
                <div className="ai-content mb-8 pt-1 flex-grow">
                  {htmr(parsedText)}
                </div>
              </div>
            );
          }

          return null;
        })}
        <div ref={contentRef} />
      </div>

      <div className="md:max-w-3xl mx-auto w-full flex-shrink-0">
        <ExpandableInput onClick={handleClickInput} isLoading={loading} />
      </div>
    </div>
  );
}
