import { Clipboard, CheckCircle, Lock } from "lucide-react";

const props = [
  {
    title: "Copy-Paste Ready",
    description:
      "Prompts work in ChatGPT, Gemini, Midjourney, and more. Just paste and generate.",
    icon: Clipboard,
  },
  {
    title: "Tested & Curated",
    description:
      "Every prompt verified to produce real results. No guessing, no disappointment.",
    icon: CheckCircle,
  },
  {
    title: "Pay Once, Access Everything",
    description:
      "Lifetime access to all prompts. No subscriptions, no hidden fees.",
    icon: Lock,
  },
];

export function ValueProps() {
  return (
    <section className="bg-[#0a0a0a] border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {props.map((prop) => (
            <div
              key={prop.title}
              className="rounded-xl border border-white/5 bg-[#111111] p-8 text-center transition-all hover:border-white/10 hover:-translate-y-1"
            >
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#f97316]/10 text-[#f97316]">
                <prop.icon className="size-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">
                {prop.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
