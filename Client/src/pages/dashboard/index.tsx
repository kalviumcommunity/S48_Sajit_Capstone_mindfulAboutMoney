import { useMemo, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  WalletIcon,
  CreditCardIcon,
  BarChartIcon,
  PlusIcon,
  ListIcon,
} from "lucide-react";

// Components
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordList } from "./financial-record-list";
import { useFinancialRecords } from "../../contexts/financial-record-context";

export const Dashboard = () => {
  const { user } = useUser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { records } = useFinancialRecords();
  const [chartType, setChartType] = useState("income");
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Advanced financial calculations
  const {
    monthlyIncome,
    monthlyExpenses,
    netCashFlow,
    chartData,
    // incomeBreakdown,
    // expenseBreakdown,
  } = useMemo(() => {
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, 1);

    interface MonthlyData {
      month: string;
      income: number;
      expenses: number;
    }
    
    // Explicit type for monthlyData
    const monthlyData: { [key: string]: MonthlyData } = {};

    records
      .filter((record) => new Date(record.date) >= sixMonthsAgo)
      .forEach((record) => {
        const date = new Date(record.date);
        const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = {
            month: monthKey,
            income: 0,
            expenses: 0,
          };
        }

        if (record.type === "Income") {
          monthlyData[monthKey].income += record.amount;
        } else {
          monthlyData[monthKey].expenses += record.amount;
        }
      });

    // Convert to chart-friendly format
    const chartData = Object.values(monthlyData)
      .sort((a, b) => {
        const [aYear, aMonth] = a.month.split("-").map(Number);
        const [bYear, bMonth] = b.month.split("-").map(Number);
        return aYear - bYear || aMonth - bMonth;
      })
      .map((data) => ({
        ...data,
        monthName: new Date(Date.parse(`${data.month}-01`)).toLocaleString(
          "default",
          { month: "short" }
        ),
      }));

    // Calculate totals
    const monthlyIncome = chartData.reduce((sum, item) => sum + item.income, 0);
    const monthlyExpenses = chartData.reduce(
      (sum, item) => sum + item.expenses,
      0
    );
    const netCashFlow = monthlyIncome - monthlyExpenses;

    const incomeBreakdown = records
      .filter((r) => r.type === "Income")
      .reduce<{ [key: string]: number }>((acc, record) => {
        acc[record.category] = (acc[record.category] || 0) + record.amount;
        return acc;
      }, {});

    const expenseBreakdown = records
      .filter((r) => r.type === "Expense")
      .reduce<{ [key: string]: number }>((acc, record) => {
        acc[record.category] = (acc[record.category] || 0) + record.amount;
        return acc;
      }, {});

    return {
      monthlyIncome,
      monthlyExpenses,
      netCashFlow,
      chartData,
      incomeBreakdown,
      expenseBreakdown,
    };
  }, [records]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-24 pb-16 px-4'>
      <div className='max-w-7xl mx-auto space-y-8'>
        {/* Personalized Header */}
        <div className='text-center space-y-4'>
          <h1 className='text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 animate-gradient-x tracking-tight'>
            Welcome, {user?.firstName}
          </h1>
          <p className='text-xl md:text-2xl text-slate-600 font-medium tracking-wide'>
            Let's take control of your financial journey today
          </p>
        </div>

        {/* Financial Insights Grid */}
        <div className='grid md:grid-cols-3 gap-6'>
          {/* Financial Overview Card */}
          <div className='md:col-span-2 bg-white border-2 border-emerald-100 rounded-3xl p-6 shadow-2xl hover:shadow-emerald-200/50 transition-all duration-300 transform hover:-translate-y-2'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold text-emerald-800 flex items-center'>
                <BarChartIcon className='mr-3 text-emerald-600' />
                Financial Trajectory
              </h2>
              <div className='flex space-x-2 bg-emerald-50 rounded-full p-1'>
                <button
                  onClick={() => setChartType("income")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    chartType === "income"
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "text-emerald-800 hover:bg-emerald-100"
                  }`}
                >
                  Income
                </button>
                <button
                  onClick={() => setChartType("expenses")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    chartType === "expenses"
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "text-emerald-800 hover:bg-emerald-100"
                  }`}
                >
                  Expenses
                </button>
              </div>
            </div>

            {/* Responsive Chart */}
            <div className='w-full h-80'>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray='3 3'
                    stroke='#99f6e4'
                    strokeOpacity={0.5}
                  />
                  <XAxis
                    dataKey='monthName'
                    stroke='#0d9488'
                    strokeOpacity={0.7}
                  />
                  <YAxis stroke='#0d9488' strokeOpacity={0.7} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f0fdf4",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Line
                    type='monotone'
                    dataKey={chartType === "income" ? "income" : "expenses"}
                    stroke='#10b981'
                    strokeWidth={3}
                    dot={{
                      r: 6,
                      fill: "#059669",
                      stroke: "white",
                      strokeWidth: 2,
                    }}
                    activeDot={{
                      r: 8,
                      fill: "#047857",
                      stroke: "white",
                      strokeWidth: 3,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Financial Highlights & Quick Actions */}
          <div className='bg-white border-2 border-cyan-100 rounded-3xl p-6 shadow-2xl hover:shadow-cyan-200/50 transition-all duration-300 transform hover:-translate-y-2'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-bold text-cyan-800 flex items-center'>
                <WalletIcon className='mr-3 text-cyan-600' />
                Financial Pulse
              </h2>
              <button
                onClick={() => setIsFormOpen(!isFormOpen)}
                className='bg-cyan-50 text-cyan-800 hover:bg-cyan-100 rounded-full p-2 transition'
              >
                {isFormOpen ? <ListIcon /> : <PlusIcon />}
              </button>
            </div>

            {/* Conditional Rendering: Financial Form or Highlights */}
            {isFormOpen ? (
              <div className='space-y-4'>
                <FinancialRecordForm />
              </div>
            ) : (
              <div className='space-y-4'>
                {/* Income Card */}
                <div className='bg-emerald-50 rounded-xl p-4 border border-emerald-100 hover:shadow-lg transition'>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                      <TrendingUpIcon className='text-emerald-600 mr-2' />
                      <h3 className='text-lg font-semibold text-emerald-800'>
                        Total Income
                      </h3>
                    </div>
                    <p className='text-2xl font-black text-emerald-700'>
                      ₹{monthlyIncome.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Expenses Card */}
                <div className='bg-rose-50 rounded-xl p-4 border border-rose-100 hover:shadow-lg transition'>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                      <TrendingDownIcon className='text-rose-600 mr-2' />
                      <h3 className='text-lg font-semibold text-rose-800'>
                        Total Expenses
                      </h3>
                    </div>
                    <p className='text-2xl font-black text-rose-700'>
                      ₹{monthlyExpenses.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Net Cash Flow */}
                <div
                  className={`${
                    netCashFlow >= 0
                      ? "bg-cyan-50 border-cyan-100 text-cyan-800"
                      : "bg-rose-50 border-rose-100 text-rose-800"
                  } rounded-xl p-4 border hover:shadow-lg transition`}
                >
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                      <CreditCardIcon
                        className={`${
                          netCashFlow >= 0 ? "text-cyan-600" : "text-rose-600"
                        } mr-2`}
                      />
                      <h3 className='text-lg font-semibold'>Net Cash Flow</h3>
                    </div>
                    <p
                      className={`text-2xl font-black ${
                        netCashFlow >= 0 ? "text-cyan-700" : "text-rose-700"
                      }`}
                    >
                      ₹{Math.abs(netCashFlow).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Financial Records */}
        <div className='bg-white border-2 border-cyan-100 rounded-3xl p-6 shadow-2xl hover:shadow-cyan-200/50 transition-all duration-300 transform hover:-translate-y-2'>
          <h2 className='text-2xl font-bold text-cyan-800 mb-6 flex items-center'>
            <ListIcon className='mr-3 text-cyan-600' />
            Recent Transactions
          </h2>
          <FinancialRecordList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
