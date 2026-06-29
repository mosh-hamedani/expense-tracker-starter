import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ["#5b8def", "#34c759", "#ff9f0a", "#ff453a", "#bf5af2", "#64d2ff", "#8e8e93"];

function CategoryChart({ transactions }) {
  const totals = {};
  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      totals[t.category] = (totals[t.category] || 0) + Number(t.amount);
    });

  const data = Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`$${value}`, "Spent"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryChart;
