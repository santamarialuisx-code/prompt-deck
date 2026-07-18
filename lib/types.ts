export interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt_text: string;
  negative_prompt?: string;
  category: string;
  tools: string[];
  platforms: string[];
  example_output_url?: string;
  is_free: boolean;
  sort_order: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  payment_method: "lemon_squeezy" | "pago_movil" | "crypto";
  status: "pending" | "confirmed" | "failed";
  lemon_squeezy_id?: string;
  confirmed_at?: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  has_lifetime_access: boolean;
  created_at: string;
}
