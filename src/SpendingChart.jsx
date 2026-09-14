import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, ResponsiveContainer } from 'recharts'
import { formatMoney } from './format'

const BAR_COLOR = "#1d4d3c";
const INK = "#15241f";
const MUTED_INK = "#5d6e66";
const GRID_COLOR = "#d5ded7";
const CHART_HEIGHT = 280;

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
    <section className="spending-chart">
      <h2>Where it went</h2>
      {data.length === 0 ? (
        <p className="empty">Spending by category shows up here once you add an expense.</p>
      ) : (
        <div className="chart-scroll">
          <div className="chart-inner">
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
              <BarChart data={data} margin={{ top: 24, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid vertical={false} stroke={GRID_COLOR} />
                <XAxis
                  dataKey="category"
                  interval={0}
                  tick={{ fill: INK, fontSize: 13 }}
                  axisLine={{ stroke: GRID_COLOR }}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={formatMoney}
                  tick={{ fill: MUTED_INK, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={64}
                />
                <Tooltip
                  cursor={{ fill: "rgba(29, 77, 60, 0.06)" }}
                  formatter={(value) => [formatMoney(value), "Spent"]}
                  contentStyle={{ border: `1px solid ${GRID_COLOR}`, borderRadius: 6, fontSize: 13 }}
                  labelStyle={{ color: INK, fontWeight: 600, textTransform: "capitalize" }}
                  itemStyle={{ color: INK }}
                />
                <Bar dataKey="amount" fill={BAR_COLOR} barSize={28} radius={[4, 4, 0, 0]} isAnimationActive={false}>
                  <LabelList dataKey="amount" position="top" formatter={formatMoney} fill={INK} fontSize={12} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </section>
  );
}

export default SpendingChart
