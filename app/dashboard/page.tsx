"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { VaporwaveBackground } from "@/components/VaporwaveBackground";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { ExpenseStats } from "@/components/ExpenseStats";
import { ExpenseCharts } from "@/components/ExpenseCharts";
import { QuickExpenses } from "@/components/QuickExpenses";
import { ExpenseAlert } from "@/components/ExpenseAlert";
import { LoadingScreen } from "@/components/LoadingScreen";
import { LogOut, LayoutDashboard, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchExpenses = () => {
    const storedUser = JSON.parse(localStorage.getItem("pocket_user") || "null");
    if (!storedUser) {
      router.push("/auth");
      return;
    }
    setUser(storedUser);
    const allExpenses = JSON.parse(localStorage.getItem("pocket_expenses") || "[]");
    const userExpenses = allExpenses.filter((e: any) => e.user_id === storedUser.id);
    setExpenses(userExpenses.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("pocket_user");
    router.push("/");
  };

  const clearAllExpenses = () => {
    const allExpenses = JSON.parse(localStorage.getItem("pocket_expenses") || "[]");
    const otherUsersExpenses = allExpenses.filter((e: any) => e.user_id !== user.id);
    localStorage.setItem("pocket_expenses", JSON.stringify(otherUsersExpenses));
    fetchExpenses();
  };

  if (loading) return <LoadingScreen message="LOADING_DASHBOARD" />;

  return (
    <main className="min-h-screen text-white relative pb-20">
      <VaporwaveBackground />
      
      <header className="border-b-2 border-vapor-pink bg-vapor-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="text-vapor-blue" />
            <h1 className="text-xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-vapor-pink to-vapor-blue">
              POCKET_RUNWAY
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-vapor-green">
              <User size={14} />
              {user?.email}
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 border-2 border-vapor-pink text-vapor-pink hover:bg-vapor-pink hover:text-vapor-dark transition-all"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <ExpenseAlert expenses={expenses} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <ExpenseStats expenses={expenses} onClearAll={clearAllExpenses} />
            <ExpenseCharts expenses={expenses} />
            <div className="bg-vapor-dark/40 border-2 border-vapor-purple p-4 md:p-6">
              <ExpenseList expenses={expenses} onExpenseDeleted={fetchExpenses} />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-24 space-y-8">
              <ExpenseForm onExpenseAdded={fetchExpenses} />
              <QuickExpenses onExpenseAdded={fetchExpenses} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
