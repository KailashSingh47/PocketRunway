"use client";

import { Tables } from "@/database.types";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from "recharts";

type Expense = Tables<"expenses">;

const COLORS = ["#ff71ce", "#01cdfe", "#05ffa1", "#b967ff", "#fffb96", "#ff4655"];

export const ExpenseCharts = ({ expenses }: { expenses: Expense[] }) => {
  if (expenses.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-vapor-dark/60 border-2 border-vapor-blue p-8 h-[250px] flex items-center justify-center text-vapor-blue/50 italic font-mono text-sm">
          NO_DATA_FOR_BAR_CHART
        </div>
        <div className="bg-vapor-dark/60 border-2 border-vapor-pink p-8 h-[250px] flex items-center justify-center text-vapor-pink/50 italic font-mono text-sm">
          NO_DATA_FOR_PIE_CHART
        </div>
      </div>
    );
  }

  // Prepare data for Bar Chart (Daily spending)
  const dailyData = expenses.reduce((acc, curr) => {
    const date = new Date(curr.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    acc[date] = (acc[date] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);

  const barData = Object.entries(dailyData)
    .map(([name, amount]) => ({ name, amount }))
    .slice(-7); // Last 7 days

  // Prepare data for Pie Chart (Category breakdown)
  const categoryData = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <div className="bg-vapor-dark/60 border-2 border-vapor-blue p-3 md:p-4 h-[250px] md:h-[300px]">
        <h3 className="text-vapor-blue text-[10px] md:text-xs font-bold uppercase mb-4 italic">Daily Spending (₹)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#b967ff33" />
            <XAxis dataKey="name" stroke="#01cdfe" fontSize={9} />
            <YAxis stroke="#01cdfe" fontSize={9} />
            <Tooltip 
              formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Amount']}
              contentStyle={{ backgroundColor: '#241734', border: '1px solid #ff71ce', color: '#fff', fontSize: '10px' }}
              itemStyle={{ color: '#05ffa1' }}
            />
            <Bar dataKey="amount" fill="#ff71ce">
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-vapor-dark/60 border-2 border-vapor-pink p-3 md:p-4 h-[250px] md:h-[300px]">
        <h3 className="text-vapor-pink text-[10px] md:text-xs font-bold uppercase mb-4 italic">Category Distribution</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Total']}
              contentStyle={{ backgroundColor: '#241734', border: '1px solid #ff71ce', color: '#fff', fontSize: '10px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
