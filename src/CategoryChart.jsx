import { formatUSD } from './format'

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

  const max = data[0].amount;

  return (
    <section className="breakdown" aria-label="Spending by category">
      <h2 className="rcpt-h">Where it went</h2>
      <ul className="bars">
        {data.map((entry, index) => (
          <li className="bar-row" key={entry.category}>
            <div className="bar-top">
              <span className="bar-cat">{entry.category}</span>
              <span className="bar-amt">{formatUSD(entry.amount)}</span>
            </div>
            <span className="bar-track">
              <span
                className={`bar-fill${index === 0 ? " is-top" : ""}`}
                style={{ width: `${(entry.amount / max) * 100}%` }}
              />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CategoryChart;
