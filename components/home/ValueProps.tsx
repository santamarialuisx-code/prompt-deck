const props = [
  {
    title: "Copy-Paste Ready",
    description:
      "Prompts work in ChatGPT, Gemini, Midjourney, and more. Just paste and generate.",
    icon: (
      <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
      </svg>
    ),
  },
  {
    title: "Tested & Curated",
    description:
      "Every prompt verified to produce real results. No guessing, no disappointment.",
    icon: (
      <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: "Pay Once, Access Everything",
    description:
      "Lifetime access to all prompts. No subscriptions, no hidden fees.",
    icon: (
      <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
];

export function ValueProps() {
  return (
    <section className="border-t bg-muted/20">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {props.map((prop) => (
            <div key={prop.title} className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {prop.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {prop.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
