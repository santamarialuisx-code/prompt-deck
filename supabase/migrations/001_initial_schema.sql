-- Prompt Deck initial schema
-- Categories, prompts, users, purchases with RLS

-- ============================================================
-- 1. CATEGORIES
-- ============================================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 2. PROMPTS
-- ============================================================
CREATE TABLE prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  prompt_text TEXT NOT NULL,
  negative_prompt TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  tool_compatibility TEXT[] DEFAULT '{}',
  platform TEXT[] DEFAULT '{}',
  example_output_url TEXT,
  is_free BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 3. USERS (extends Supabase auth.users)
-- ============================================================
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  has_lifetime_access BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 4. PURCHASES
-- ============================================================
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  payment_method TEXT CHECK (payment_method IN ('lemon_squeezy', 'pago_movil', 'crypto')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed')),
  lemon_squeezy_id TEXT,
  confirmed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 5. INDEXES
-- ============================================================
CREATE INDEX idx_prompts_category ON prompts(category_id);
CREATE INDEX idx_prompts_is_free ON prompts(is_free);
CREATE INDEX idx_prompts_sort_order ON prompts(sort_order);
CREATE INDEX idx_purchases_user ON purchases(user_id);
CREATE INDEX idx_purchases_status ON purchases(status);

-- ============================================================
-- 6. AUTO-CREATE USER PROFILE ON SIGNUP
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 7. ROW-LEVEL SECURITY
-- ============================================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Categories: public read
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

-- Prompts: public read, authenticated write (admin only in practice)
CREATE POLICY "Prompts are viewable by everyone" ON prompts
  FOR SELECT USING (true);

-- Users: can read/update own profile
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Purchases: can read own purchases
CREATE POLICY "Users can view own purchases" ON purchases
  FOR SELECT USING (auth.uid() = user_id);
