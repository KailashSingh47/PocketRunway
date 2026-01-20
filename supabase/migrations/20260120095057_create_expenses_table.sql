BEGIN;

CREATE TABLE IF NOT EXISTS public.expenses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    date DATE DEFAULT CURRENT_DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own expenses" 
    ON public.expenses FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own expenses" 
    ON public.expenses FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own expenses" 
    ON public.expenses FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own expenses" 
    ON public.expenses FOR DELETE 
    USING (auth.uid() = user_id);

COMMIT;