import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { SamplePrompts } from "@/components/home/SamplePrompts";
import { FinalCTA } from "@/components/home/FinalCTA";
import { getFreeSamples } from "@/lib/mdx";

export default function Home() {
  const freePrompts = getFreeSamples();

  return (
    <main>
      <Hero />
      <ValueProps />
      <FeaturedCategories />
      <SamplePrompts prompts={freePrompts} />
      <FinalCTA />
    </main>
  );
}
