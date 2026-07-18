import Link from "next/link";
import { Briefcase, Palette, Smartphone, Camera, Package } from "lucide-react";

const categories = [
  {
    name: "Professional Portrait",
    slug: "selfie-to-professional-portrait",
    description: "LinkedIn headshots and corporate profile photos",
    icon: Briefcase,
  },
  {
    name: "Artistic",
    slug: "selfie-to-artistic",
    description: "Oil paintings, anime avatars, and creative styles",
    icon: Palette,
  },
  {
    name: "Social Media",
    slug: "selfie-to-social-media",
    description: "Instagram, TikTok, and influencer-ready photos",
    icon: Smartphone,
  },
  {
    name: "Headshot",
    slug: "selfie-to-headshot",
    description: "Executive and studio-quality headshots",
    icon: Camera,
  },
  {
    name: "Product Photo",
    slug: "product-photo-enhancement",
    description: "E-commerce and Amazon listing optimization",
    icon: Package,
  },
];

export function FeaturedCategories() {
  return (
    <section className="bg-[#0a0a0a] border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Browse by Category
          </h2>
          <p className="mt-3 text-lg text-gray-400">
            Find the perfect prompt for your use case
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/gallery/${cat.slug}`}
              className="group rounded-xl border border-white/5 bg-[#111111] p-6 transition-all hover:border-[#84cc16]/30 hover:-translate-y-1"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#84cc16]/10 text-[#84cc16]">
                <cat.icon className="size-5" />
              </div>
              <h3 className="mt-3 text-lg font-bold text-white group-hover:text-[#84cc16] transition-colors">
                {cat.name}
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
