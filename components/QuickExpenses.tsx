"use client";

import { Coffee, Pizza, ShoppingBag, Bus, Zap } from "lucide-react";

const QUICK_ITEMS = [
  { name: "Coffee", amount: 40, category: "Food", icon: <Coffee size={16} /> },
  { name: "Lunch", amount: 250, category: "Food", icon: <Pizza size={16} /> },
  { name: "Auto", amount: 100, category: "Transport", icon: <Bus size={16} /> },
  { name: "Shopping", amount: 1000, category: "Shopping", icon: <ShoppingBag size={16} /> },
];

export const QuickExpenses = ({ onExpenseAdded }: { onExpenseAdded: () => void }) => {
  const addQuickExpense = (item: typeof QUICK_ITEMS[0]) => {
    const user = JSON.parse(localStorage.getItem("pocket_user") || "null");
    if (!user) return;

    const newExpense = {
      id: Date.now().toString(),
      user_id: user.id,
      amount: item.amount,
      category: item.category,
      description: `Quick ${item.name}`,
      date: new Date().toISOString(),
    };

    const allExpenses = JSON.parse(localStorage.getItem("pocket_expenses") || "[]");
    allExpenses.push(newExpense);
    localStorage.setItem("pocket_expenses", JSON.stringify(allExpenses));

    onExpenseAdded();
  };

  return (
    <div className="bg-vapor-dark/60 border-2 border-vapor-green p-4 shadow-[4px_4px_0px_0px_rgba(5,255,161,0.2)]">
      <h3 className="text-vapor-green text-xs font-bold uppercase mb-4 italic flex items-center gap-2">
        <Zap size={14} /> Quick Add (₹)
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2 md:gap-3">
        {QUICK_ITEMS.map((item) => (
          <button
            key={item.name}
            onClick={() => addQuickExpense(item)}
            className="flex flex-col sm:flex-row lg:flex-row items-center justify-between p-2 md:p-3 border border-vapor-green/30 hover:bg-vapor-green hover:text-vapor-dark transition-all group gap-1"
          >
            <span className="flex items-center gap-1 md:gap-2 text-[10px] md:text-xs font-bold">
              {item.icon} <span className="hidden xs:inline">{item.name}</span>
            </span>
            <span className="text-[10px] md:text-xs font-mono font-bold">₹{item.amount}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
