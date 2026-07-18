export type PricingTier = {
  id: string;
  name: string;
  price: string;
  period?: string;
  features: string[];
  highlighted: boolean;
  accentColor: string;
  ctaText: string;
};

export type PricingCardProps = {
  tier: PricingTier;
  selected: boolean;
  onSelect: (tierId: string) => void;
};

export type BuyButtonProps = {
  tier: string;
  label?: string;
  variant?: "default" | "outline";
};