"use client";

import { Tables } from "@/database.types";

type Expense = Tables<"expenses">;

export const ExpenseStats = ({ expenses }: { expenses: Expense[] }) => {
  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
      <div className="bg-vapor-dark/60 border-2 border-vapor-green p-4 md:p-6 shadow-[5px_5px_0px_0px_rgba(5,255,161,0.5)]">
        <h3 className="text-vapor-green font-bold mb-2 italic uppercase tracking-widest text-xs md:text-sm">Total Spent</h3>
        <p className="text-3xl md:text-5xl font-black text-white drop-shadow-[0_2px_2px_rgba(5,255,161,0.5)]">
          ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </p>
      </div>
      
      <div className="bg-vapor-dark/60 border-2 border-vapor-yellow p-4 md:p-6 shadow-[5px_5px_0px_0px_rgba(255,251,150,0.5)]">
        <h3 className="text-vapor-yellow font-bold mb-4 italic uppercase tracking-widest text-xs md:text-sm">By Category</h3>
        <div className="space-y-3">
          {Object.entries(categoryTotals).map(([cat, amt]) => (
            <div key={cat} className="flex justify-between items-center">
              <span className="text-[10px] text-gray-400 uppercase">{cat}</span>
              <div className="flex-1 mx-3 h-1 bg-vapor-purple/20 relative">
                <div 
                  className="absolute inset-y-0 left-0 bg-vapor-yellow" 
                  style={{ width: `${(amt / total) * 100}%` }}
                />
              </div>
              <span className="text-xs font-bold text-vapor-yellow">₹{amt.toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
