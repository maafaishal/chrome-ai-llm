import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

import { ModeToggle } from "./mode-toggle";

export function SiteHeader() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <div>
          <h2 className="text-xl font-semibold">Chrome AI</h2>
        </div>
        <div className="flex gap-4 pr-4">
          <a href="https://github.com/maafaishal/chrome-ai-llm" target="_blank">
            <Button variant="ghost" className="h-8 w-8 px-0">
              <GitHubLogoIcon className="h-[1.4rem] w-[1.4rem] " />
            </Button>
          </a>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
