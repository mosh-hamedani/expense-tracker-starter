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
    <section className="balance-sheet" aria-label="Balance">
      <div className="bs-term bs-credit">
        <span className="bs-label">Money in</span>
        <span className="bs-figure">{formatUSD(totalIncome)}</span>
      </div>

      <span className="bs-op" aria-hidden="true">&minus;</span>

      <div className="bs-term bs-debit">
        <span className="bs-label">Money out</span>
        <span className="bs-figure">{formatUSD(totalExpenses)}</span>
      </div>

      <span className="bs-op" aria-hidden="true">=</span>

      <div className={`bs-term bs-net${balance < 0 ? " is-negative" : ""}`}>
        <span className="bs-label">Balance</span>
        <span className="bs-figure">{formatUSD(balance)}</span>
      </div>
    </section>
  );
}

export default Summary;
