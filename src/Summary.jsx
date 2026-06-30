import { formatUSD } from './format'

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  return (
    <section className="summary" aria-label="Account summary">
      <div className="leader sum-in">
        <span className="lead-label">Money in</span>
        <span className="lead-dots" aria-hidden="true" />
        <span className="lead-val">+{formatUSD(totalIncome)}</span>
      </div>
      <div className="leader sum-out">
        <span className="lead-label">Money out</span>
        <span className="lead-dots" aria-hidden="true" />
        <span className="lead-val">−{formatUSD(totalExpenses)}</span>
      </div>

      <div className="stamp">
        <span className="stamp-label">{balance < 0 ? "Overdrawn" : "Balance"}</span>
        <span className="stamp-amt">{formatUSD(balance)}</span>
      </div>
    </section>
  );
}

export default Summary;
