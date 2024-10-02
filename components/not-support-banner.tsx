import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

export function NotSupportBanner() {
  const [chromeVersion, setChromeVersion] = useState(0);

  useEffect(() => {
    function getChromeVersion() {
      var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
      return raw ? parseInt(raw[2], 10) : 0;
    }
    setChromeVersion(getChromeVersion());
  }, []);

  const isBrowserSupport = chromeVersion >= 127;

  return (
    <div className="flex flex-col h-full justify-center text-black">
      <div className="rounded-[26px] bg-gray-100 py-6 px-8">
        <h2 className="scroll-m-20 border-b-2 pb-4 mb-4 text-3xl font-semibold tracking-tight first:mt-0 text-center">
          Enabling Chrome AI
        </h2>
        <p className="leading-7">
          Chrome built-in AI with Gemini Nano is experimental and will change as
          they test and address feedback.
        </p>

        {!isBrowserSupport && (
          <Alert className="bg-red-100 mt-2 text-black border-none">
            <AlertCircle className="h-4 w-4 !text-red-500 dark:text-red-500" />
            <AlertTitle className="text-red-500 font-bold">
              Your browser is not supported.
            </AlertTitle>
            <AlertDescription>
              Please use Chrome version 127 or higher.
            </AlertDescription>
          </Alert>
        )}

        {isBrowserSupport && (
          <div className="flex flex-col items-start justify-start">
            <p className="leading-7 mt-2 mb-1">
              Once your browser is installed, ensure the following flags are
              set:
            </p>
            <ol className="grid gap-4 counter-reset:step">
              <li className="flex items-center gap-4 text-sm">
                <div className="flex h-6 w-6 text-xs items-center justify-center rounded-full bg-black text-white counter:step">
                  1
                </div>
                <div className="w-full">
                  <h4 className="font-medium">
                    Step 1:&nbsp;
                    <Link
                      href="chrome://flags/#prompt-api-for-gemini-nano"
                      target="_blank"
                      className="underline"
                    >
                      chrome://flags/#prompt-api-for-gemini-nano
                    </Link>
                  </h4>
                  <p className="text-muted-foreground">
                    Select &apos;Enabled&apos;
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4 text-sm">
                <div className="flex h-6 w-6 text-xs items-center justify-center rounded-full bg-black text-white counter:step">
                  2
                </div>
                <div className="w-full">
                  <h4 className="font-medium">
                    Step 2:&nbsp;
                    <Link
                      href="chrome://flags/#optimization-guide-on-device-model"
                      target="_blank"
                      className="underline"
                    >
                      chrome://flags/#optimization-guide-on-device-model
                    </Link>
                  </h4>
                  <p className="text-muted-foreground">
                    Select &apos;Enabled BypassPrefRequirement&apos;
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4 text-sm">
                <div className="flex h-6 w-6 text-xs items-center justify-center rounded-full bg-black text-white counter:step">
                  3
                </div>
                <div className="w-full">
                  <h4 className="font-medium">
                    Step 3:&nbsp;
                    <Link
                      href="chrome://components"
                      target="_blank"
                      className="underline"
                    >
                      chrome://components
                    </Link>
                  </h4>
                  <p className="text-muted-foreground">
                    Click &apos;Check for Update&apos; on Optimization Guide On
                    Device Model to download the model. If you don&apos;t see
                    Optimization Guide, ensure you have set the flags correctly
                    above, relaunch your browser, and refresh the page.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
