import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { formatUSD } from './format';

// Ledger inks: greens through ochre to oxblood, with a muted grey tail.
const COLORS = ["#2f5d50", "#5c8374", "#8aa399", "#c9a227", "#cf7d3c", "#b23a2e", "#6b7268"];

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

  const totalSpent = data.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="chart">
      <h2>Spending by Category</h2>
      <div className="chart-plot">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={104}
              paddingAngle={1.5}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [formatUSD(value), "Spent"]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="chart-center" aria-hidden="true">
          <span className="chart-center-label">Total out</span>
          <span className="chart-center-value">{formatUSD(totalSpent)}</span>
        </div>
      </div>

      <ul className="chart-legend">
        {data.map((entry, index) => (
          <li key={entry.category}>
            <span
              className="swatch"
              style={{ background: COLORS[index % COLORS.length] }}
            />
            <span className="legend-cat">{entry.category}</span>
            <span className="legend-amt">{formatUSD(entry.amount)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryChart;
