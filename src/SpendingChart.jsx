import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, ResponsiveContainer } from 'recharts'

const BAR_COLOR = "#2a78d6";
const MUTED_INK = "#898781";
const GRID_COLOR = "#e1e0d9";
const CHART_HEIGHT = 300;

const formatAmount = (value) => `$${value.toLocaleString()}`;

function SpendingChart({ transactions }) {
  const totals = {};
  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    });

  const data = Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      {data.length === 0 ? (
        <p className="empty">No expenses yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
          <BarChart data={data} margin={{ top: 20, right: 10, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} stroke={GRID_COLOR} />
            <XAxis
              dataKey="category"
              interval={0}
              tick={{ fill: "#333", fontSize: 12 }}
              axisLine={{ stroke: GRID_COLOR }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatAmount}
              tick={{ fill: MUTED_INK, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "#f5f5f5" }}
              formatter={(value) => [formatAmount(value), "Spent"]}
            />
            <Bar dataKey="amount" fill={BAR_COLOR} barSize={24} radius={[4, 4, 0, 0]} isAnimationActive={false}>
              <LabelList dataKey="amount" position="top" formatter={formatAmount} fill="#333" fontSize={12} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingChart
