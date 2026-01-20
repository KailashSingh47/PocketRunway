"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { PlusCircle } from "lucide-react";

const CATEGORIES = ["Food", "Transport", "Entertainment", "Bills", "Shopping", "Other"];

export const ExpenseForm = ({ onExpenseAdded }: { onExpenseAdded: () => void }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("expenses").insert({
      user_id: user.id,
      amount: parseFloat(amount),
      category,
      description,
    });

    if (!error) {
      setAmount("");
      setDescription("");
      onExpenseAdded();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-vapor-dark/60 border-2 border-vapor-blue p-4 md:p-6 shadow-[5px_5px_0px_0px_rgba(1,205,254,0.5)]">
      <h3 className="text-vapor-blue font-bold mb-4 italic uppercase tracking-widest text-sm md:text-base">Add New Expense</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-[10px] md:text-xs text-vapor-pink uppercase mb-1">Amount (₹)</label>
          <input
            type="number"
            step="0.01"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-transparent border border-vapor-pink p-3 md:p-2 text-white focus:outline-none focus:ring-1 focus:ring-vapor-pink text-base md:text-sm"
            placeholder="0.00"
            inputMode="decimal"
          />
        </div>
        <div>
          <label className="block text-[10px] md:text-xs text-vapor-pink uppercase mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-vapor-dark border border-vapor-pink p-3 md:p-2 text-white focus:outline-none text-base md:text-sm"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[10px] md:text-xs text-vapor-pink uppercase mb-1">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-transparent border border-vapor-pink p-3 md:p-2 text-white focus:outline-none focus:ring-1 focus:ring-vapor-pink text-base md:text-sm"
            placeholder="What was it for?"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-vapor-pink text-vapor-dark font-black py-4 md:py-3 flex items-center justify-center gap-2 hover:bg-vapor-green transition-all active:scale-95 disabled:opacity-50 text-lg md:text-base shadow-[6px_6px_0px_0px_rgba(5,255,161,0.4)] mt-2"
        >
          <PlusCircle size={24} className="md:w-5 md:h-5" />
          {loading ? "PROCESSING..." : "ADD EXPENSE"}
        </button>
      </div>
    </form>
  );
};
