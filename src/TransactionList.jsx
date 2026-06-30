import { useState } from 'react'
import { formatUSD, formatDate } from './format'

function TransactionList({ transactions, categories, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const handleVoid = (t) => {
    if (window.confirm(`Void "${t.description}"?`)) {
      onDelete(t.id);
    }
  };

  const clearFilters = () => {
    setFilterType("all");
    setFilterCategory("all");
  };

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  const isFiltered = filterType !== "all" || filterCategory !== "all";

  return (
    <section className="transactions" aria-label="Account activity">
      <h2 className="rcpt-h">Account activity</h2>
      <div className="filters">
        <select value={filterType} aria-label="Filter by direction" onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All directions</option>
          <option value="income">Money in</option>
          <option value="expense">Money out</option>
        </select>
        <select value={filterCategory} aria-label="Filter by category" onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filteredTransactions.length > 0 ? (
        <ul className="items">
          {filteredTransactions.map(t => {
            const income = t.type === "income";
            return (
              <li className="item" key={t.id}>
                <div className="item-main">
                  <span className="item-name">{t.description}</span>
                  <span className="item-leader" aria-hidden="true" />
                  <span className={`item-amt ${income ? "is-in" : "is-out"}`}>
                    {income ? "+" : "−"}{formatUSD(t.amount)}
                  </span>
                </div>
                <div className="item-sub">
                  <span>{formatDate(t.date)} · {t.category}</span>
                  <button className="void" onClick={() => handleVoid(t)}>Void</button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="rcpt-empty">
          <p>
            {isFiltered
              ? "No entries match this filter."
              : "No entries yet. Ring up your first one above."}
          </p>
          {isFiltered && (
            <button className="clear-filters" onClick={clearFilters}>
              Show all entries
            </button>
          )}
        </div>
      )}

      <footer className="rcpt-foot">
        <div className="leader">
          <span className="lead-label">Entries</span>
          <span className="lead-dots" aria-hidden="true" />
          <span className="lead-val">{filteredTransactions.length}</span>
        </div>
        <div className="barcode" aria-hidden="true" />
        <p className="barcode-no">FT 0001 7290 4416</p>
        <p className="foot-note">Keep this receipt for your records.</p>
      </footer>
    </section>
  );
}

export default TransactionList;
