import { FileText, Layers } from "lucide-react";

interface SocialStripProps {
  promptCount: number;
  categoryCount: number;
}

export function SocialStrip({
  promptCount,
  categoryCount,
}: SocialStripProps) {
  const stats = [
    { icon: FileText, value: promptCount, label: "Prompts" },
    { icon: Layers, value: categoryCount, label: "Categories" },
  ];

  return (
    <section className="bg-[#0a0a0a] border-t border-b border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <stat.icon className="h-5 w-5 text-[#84cc16]" />
              <span className="text-2xl font-black text-white">
                {stat.value}
              </span>
              <span className="text-sm text-gray-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
