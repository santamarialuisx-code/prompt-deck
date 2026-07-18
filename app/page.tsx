import { Hero } from "@/components/home/Hero";
import { SocialProof } from "@/components/home/SocialProof";
import { ValueProps } from "@/components/home/ValueProps";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { SamplePrompts } from "@/components/home/SamplePrompts";
import { BeforeAfterShowcase } from "@/components/home/BeforeAfterShowcase";
import { FinalCTA } from "@/components/home/FinalCTA";
import { getFreeSamples } from "@/lib/mdx";

export default function Home() {
  const freePrompts = getFreeSamples();

  return (
    <main>
      <Hero />
      <SocialProof />
      <ValueProps />
      <FeaturedCategories />
      <SamplePrompts prompts={freePrompts} />
      <BeforeAfterShowcase />
      <FinalCTA />
    </main>
  );
}
