"use client";

import { Trash2 } from "lucide-react";

export const ExpenseList = ({ expenses, onExpenseDeleted }: { expenses: any[], onExpenseDeleted: () => void }) => {
  const deleteExpense = (id: string) => {
    const allExpenses = JSON.parse(localStorage.getItem("pocket_expenses") || "[]");
    const filtered = allExpenses.filter((e: any) => e.id !== id);
    localStorage.setItem("pocket_expenses", JSON.stringify(filtered));
    onExpenseDeleted();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-vapor-green font-bold italic uppercase tracking-widest flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <span className="text-sm md:text-base">Recent Transactions</span>
        <span className="text-[10px] font-mono text-vapor-purple">Showing last {expenses.length}</span>
      </h3>
      <div className="h-[350px] overflow-x-auto custom-scrollbar pr-2 border-t border-vapor-purple/20">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead className="sticky top-0 bg-vapor-dark/90 backdrop-blur-sm z-10">
            <tr className="border-b border-vapor-purple/30 text-vapor-pink text-[10px] md:text-xs uppercase">
              <th className="p-2 md:p-3">Date</th>
              <th className="p-2 md:p-3">Category</th>
              <th className="p-2 md:p-3 hidden sm:table-cell">Description</th>
              <th className="p-2 md:p-3 text-right">Amount</th>
              <th className="p-2 md:p-3"></th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-b border-vapor-purple/10 hover:bg-vapor-purple/5 transition-colors group">
                <td className="p-2 md:p-3 text-[10px] md:text-sm font-mono">{new Date(expense.date).toLocaleDateString()}</td>
                <td className="p-2 md:p-3">
                  <span className="px-1.5 py-0.5 text-[8px] md:text-[10px] border border-vapor-blue text-vapor-blue uppercase">
                    {expense.category}
                  </span>
                </td>
                <td className="p-2 md:p-3 text-xs md:text-sm text-gray-300 truncate max-w-[100px] md:max-w-[150px] hidden sm:table-cell">
                  {expense.description}
                </td>
                <td className="p-2 md:p-3 text-right font-bold text-vapor-green text-xs md:text-sm">
                  ₹{expense.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
                <td className="p-2 md:p-3 text-right">
                  <button 
                    onClick={() => deleteExpense(expense.id)}
                    className="text-vapor-pink opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {expenses.length === 0 && (
              <tr>
                <td colSpan={5} className="p-10 text-center text-vapor-purple italic">No expenses found... yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
