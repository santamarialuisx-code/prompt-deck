import { Star, Users, Zap, Shield, Clock, Award } from "lucide-react";

const stats = [
  { icon: Users, value: "2,400+", label: "Prompts Available" },
  { icon: Star, value: "4.9/5", label: "Average Rating" },
  { icon: Zap, value: "500+", label: "Happy Creators" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Content Creator",
    text: "These prompts transformed my Instagram. I went from basic selfies to professional-looking content that actually gets engagement.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Small Business Owner",
    text: "Best $29 I've ever spent. The product photo prompts alone saved me hundreds on professional photography.",
    rating: 5,
  },
  {
    name: "Elena Volkov",
    role: "Social Media Manager",
    text: "I manage 12 brand accounts. These prompts cut my content creation time in half while improving quality.",
    rating: 5,
  },
];

const trustIndicators = [
  { icon: Shield, label: "30-Day Money-Back Guarantee" },
  { icon: Clock, label: "Instant Access After Purchase" },
  { icon: Award, label: "Professionally Curated & Tested" },
];

export function SocialProof() {
  return (
    <section className="bg-[#0a0a0a] border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-20">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-8 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="h-8 w-8 mx-auto mb-3 text-[#f97316]" />
              <div className="text-3xl font-black text-white">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-white text-center mb-2">
            Loved by Creators
          </h2>
          <p className="text-gray-500 text-center mb-10 text-sm italic">
            * Example testimonials for demonstration
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-white/5 bg-[#111111] p-6 transition-all hover:border-white/10"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#f97316] text-[#f97316]" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-400">
          {trustIndicators.map((ti) => (
            <div key={ti.label} className="flex items-center gap-2">
              <ti.icon className="h-5 w-5 text-[#f97316]" />
              <span>{ti.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
