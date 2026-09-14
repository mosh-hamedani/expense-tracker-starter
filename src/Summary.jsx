import { formatMoney } from './format'

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;
  const spentShare = totalIncome > 0 ? Math.min(totalExpenses / totalIncome, 1) : 1;

  let sentence;
  if (totalIncome === 0 && totalExpenses === 0) {
    sentence = "Add your first transaction to see what's left.";
  } else if (balance >= 0) {
    sentence = `${formatMoney(balance)} left of the ${formatMoney(totalIncome)} you earned.`;
  } else {
    sentence = `You've spent ${formatMoney(-balance)} more than you earned.`;
  }

  return (
    <section className="summary" aria-label="Balance">
      <p className="summary-sentence">{sentence}</p>
      <div
        className={balance < 0 ? "summary-strip over" : "summary-strip"}
        role="img"
        aria-label={`${Math.round(spentShare * 100)}% of income spent`}
      >
        <div className="summary-strip-spent" style={{ width: `${spentShare * 100}%` }} />
      </div>
      <dl className="summary-legend">
        <div>
          <dt><span className="swatch swatch-spent" />Spent</dt>
          <dd className="expense-amount">{formatMoney(totalExpenses)}</dd>
        </div>
        <div>
          <dt>{balance >= 0 && <span className="swatch swatch-income" />}{balance < 0 ? "Over by" : "Left"}</dt>
          <dd className="income-amount">{formatMoney(Math.abs(balance))}</dd>
        </div>
      </dl>
    </section>
  );
}

export default Summary
