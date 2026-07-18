import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const categories = [
  {
    name: "Professional Portrait",
    slug: "selfie-to-professional-portrait",
    description: "LinkedIn headshots and corporate profile photos",
    icon: "👤",
  },
  {
    name: "Artistic",
    slug: "selfie-to-artistic",
    description: "Oil paintings, anime avatars, and creative styles",
    icon: "🎨",
  },
  {
    name: "Social Media",
    slug: "selfie-to-social-media",
    description: "Instagram, TikTok, and influencer-ready photos",
    icon: "📱",
  },
  {
    name: "Headshot",
    slug: "selfie-to-headshot",
    description: "Executive and studio-quality headshots",
    icon: "📸",
  },
  {
    name: "Product Photo",
    slug: "product-photo-enhancement",
    description: "E-commerce and Amazon listing optimization",
    icon: "📦",
  },
];

export function FeaturedCategories() {
  return (
    <section className="border-t">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Browse by Category
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Find the perfect prompt for your use case
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/gallery/${cat.slug}`}
              className="group flex flex-col rounded-xl border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-accent"
            >
              <span className="text-3xl">{cat.icon}</span>
              <h3 className="mt-3 text-lg font-semibold text-foreground group-hover:text-primary">
                {cat.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
