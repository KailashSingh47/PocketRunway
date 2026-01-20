"use client";

import { useState } from "react";
import { Tables } from "@/database.types";
import { AlertTriangle, TrendingUp, Info, Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Expense = Tables<"expenses">;

const WEEKLY_THRESHOLD = 2500; // Updated to ₹2,500 per user request
const PRE_WARNING_THRESHOLD = 2000; // Warning at 80%

export const ExpenseAlert = ({ expenses }: { expenses: Expense[] }) => {
  const [isVisible, setIsVisible] = useState(true);
  const now = new Date();
  
  // Calculate start of current week (Sunday)
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  // Filter expenses for the current week AND current month
  const weeklyExpenses = expenses.filter((e) => {
    const d = new Date(e.date);
    return d >= startOfWeek && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  const weeklyTotal = weeklyExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const isOverBudget = weeklyTotal > WEEKLY_THRESHOLD;
  const isPreWarning = weeklyTotal >= PRE_WARNING_THRESHOLD && weeklyTotal <= WEEKLY_THRESHOLD;

  if (!isVisible || (!isOverBudget && !isPreWarning)) return null;

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Add Title
    doc.setFontSize(20);
    doc.setTextColor(255, 113, 206); // Vapor Pink
    doc.text("PocketRunway - Expense Report", 14, 22);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    doc.text(`Weekly Total: Rs. ${weeklyTotal.toLocaleString('en-IN')}`, 14, 38);

    // Add Table
    const tableData = weeklyExpenses.map(e => [
      new Date(e.date).toLocaleDateString(),
      e.category,
      e.description || "-",
      `Rs. ${e.amount.toLocaleString('en-IN')}`
    ]);

    autoTable(doc, {
      startY: 45,
      head: [['Date', 'Category', 'Description', 'Amount']],
      body: tableData,
      headStyles: { fillColor: [255, 113, 206] },
    });

    doc.save(`PocketRunway_Weekly_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0, y: -20 }}
        animate={{ height: "auto", opacity: 1, y: 0 }}
        exit={{ height: 0, opacity: 0, y: -20 }}
        className="mb-8 overflow-hidden relative"
      >
        <div className={`bg-vapor-dark/80 border-2 ${isOverBudget ? 'border-vapor-pink shadow-[0_0_20px_rgba(255,113,206,0.3)]' : 'border-vapor-yellow shadow-[0_0_20px_rgba(255,251,150,0.2)]'} p-4 md:p-6 relative group overflow-hidden`}>
          {/* Close Button */}
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 z-20 text-white/50 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>

          <div className={`absolute inset-0 ${isOverBudget ? 'bg-vapor-pink/5' : 'bg-vapor-yellow/5'} animate-pulse pointer-events-none`} />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className={`${isOverBudget ? 'bg-vapor-pink' : 'bg-vapor-yellow'} p-3 rounded-none ${isOverBudget ? 'animate-bounce' : ''}`}>
              {isOverBudget ? <AlertTriangle size={32} className="text-vapor-dark" /> : <Info size={32} className="text-vapor-dark" />}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className={`${isOverBudget ? 'text-vapor-pink' : 'text-vapor-yellow'} font-black italic text-xl md:text-2xl uppercase tracking-tighter mb-1`}>
                {isOverBudget ? 'WEEKLY_LIMIT_EXCEEDED' : 'PRE_WARNING_ALERT'}
              </h3>
              <p className="text-white/80 font-mono text-xs md:text-sm uppercase">
                Weekly budget: ₹{WEEKLY_THRESHOLD.toLocaleString('en-IN')} | 
                Spent: <span className={`font-bold ${isOverBudget ? 'text-vapor-pink' : 'text-vapor-yellow'}`}>₹{weeklyTotal.toLocaleString('en-IN')}</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button 
                onClick={downloadPDF}
                className="flex items-center gap-2 bg-vapor-blue text-vapor-dark px-4 py-2 font-bold text-xs uppercase hover:bg-vapor-green transition-colors"
              >
                <Download size={14} /> PDF Report
              </button>
              
              <div className="flex flex-col items-center md:items-end gap-1">
                <div className={`flex items-center gap-2 font-bold text-sm ${isOverBudget ? 'text-vapor-pink' : 'text-vapor-yellow'}`}>
                  <TrendingUp size={16} />
                  <span>{isOverBudget ? 'OVER BUDGET' : 'APPROACHING LIMIT'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
