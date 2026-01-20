"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/database.types";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { ExpenseStats } from "@/components/ExpenseStats";
import { ExpenseCharts } from "@/components/ExpenseCharts";
import { ExpenseAlert } from "@/components/ExpenseAlert";
import { QuickExpenses } from "@/components/QuickExpenses";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { VaporwaveBackground } from "@/components/VaporwaveBackground";
import { ShuffleText } from "@/components/ShuffleText";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/navigation";

type Expense = Tables<"expenses">;

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  const router = useRouter();

  const fetchExpenses = async (userId: string) => {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq('user_id', userId)
      .order("date", { ascending: false });

    if (!error && data) {
      setExpenses(data);
    }
    setLoading(false);
  };

  const clearAllExpenses = async () => {
    if (!user) return;
    
    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq('user_id', user.id);

    if (!error) {
      setExpenses([]);
    } else {
      console.error("Error clearing expenses:", error);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth");
      } else {
        setUser(user);
        fetchExpenses(user.id);
      }
    };
    checkUser();
  }, []);

  const downloadAllData = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setTextColor(255, 113, 206);
    doc.text("PocketRunway - Full Expense History", 14, 22);
    
    const tableData = expenses.map(e => [
      new Date(e.date).toLocaleDateString(),
      e.category,
      e.description || "-",
      `Rs. ${e.amount.toLocaleString('en-IN')}`
    ]);

    autoTable(doc, {
      startY: 30,
      head: [['Date', 'Category', 'Description', 'Amount']],
      body: tableData,
      headStyles: { fillColor: [1, 205, 254] }, // Vapor Blue
    });

    doc.save("PocketRunway_Full_History.pdf");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-vapor-dark flex items-center justify-center">
        <div className="text-vapor-pink text-2xl font-mono animate-pulse">
          LOADING_SYSTEM...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen text-white relative pb-20">
      <VaporwaveBackground />
      
      <div className="container mx-auto px-6 pt-10 relative z-10">
        <ExpenseAlert expenses={expenses} />
        
        <header className="flex justify-between items-end mb-12 border-b-2 border-vapor-pink pb-4">
          <div>
            <h1 className="text-4xl font-black italic text-vapor-pink">
              <ShuffleText text="DASHBOARD" />
            </h1>
            <p className="text-vapor-blue font-mono text-xs uppercase tracking-widest mt-1">
              User: {user?.email?.split('@')[0]} // Status: Aesthetic
            </p>
          </div>
          <button 
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/");
            }}
            className="text-xs border border-vapor-pink px-4 py-1 hover:bg-vapor-pink hover:text-vapor-dark transition-colors"
          >
            LOGOUT
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
          <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
            <QuickExpenses onExpenseAdded={() => fetchExpenses(user.id)} />
            <ExpenseForm onExpenseAdded={() => fetchExpenses(user.id)} />
          </div>
          
          <div className="lg:col-span-2 space-y-6 order-1 lg:order-2">
            <ExpenseStats 
              expenses={expenses} 
              onClearAll={clearAllExpenses} 
            />
            <ExpenseCharts expenses={expenses} />
            <div className="bg-vapor-dark/60 border-2 border-vapor-purple p-4 md:p-6 shadow-[5px_5px_0px_0px_rgba(185,103,255,0.5)]">
              <ExpenseList expenses={expenses} onExpenseDeleted={() => fetchExpenses(user.id)} />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
