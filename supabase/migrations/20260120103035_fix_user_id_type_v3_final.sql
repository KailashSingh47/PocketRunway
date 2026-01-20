BEGIN;

-- Drop existing policies first
DROP POLICY IF EXISTS "Users can view their own expenses" ON public.expenses;
DROP POLICY IF EXISTS "Users can insert their own expenses" ON public.expenses;
DROP POLICY IF EXISTS "Users can update their own expenses" ON public.expenses;
DROP POLICY IF EXISTS "Users can delete their own expenses" ON public.expenses;
DROP POLICY IF EXISTS "Allow all for user_id" ON public.expenses;

-- Drop the foreign key constraint
ALTER TABLE public.expenses DROP CONSTRAINT IF EXISTS expenses_user_id_fkey;

-- Now alter the user_id column to TEXT
ALTER TABLE public.expenses ALTER COLUMN user_id TYPE TEXT;

-- Re-enable RLS
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Create a simple policy
CREATE POLICY "Allow all for user_id" 
    ON public.expenses 
    FOR ALL 
    USING (true) 
    WITH CHECK (true);

COMMIT;