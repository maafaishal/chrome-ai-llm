export function WelcomeBanner() {
  return (
    <div className="flex flex-col h-full justify-center text-center">
      <div className="rounded-[26px] py-6 px-8">
        <h2 className="scroll-m-20 border-b-2 pb-4 mb-4 text-3xl font-semibold tracking-tight first:mt-0 text-center">
          Chrome AI LLM - Chatbot
        </h2>
        <p className="leading-7">
          It uses Chrome built-in AI with Gemini Nano (experimental).
        </p>
      </div>
    </div>
  );
}
