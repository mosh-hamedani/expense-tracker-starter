import { useState } from 'react'
import { formatUSD, formatDate } from './format'

function TransactionList({ transactions, categories, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const handleDelete = (t) => {
    if (window.confirm(`Delete "${t.description}"?`)) {
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
    <div className="transactions">
      <h2>Ledger</h2>
      <div className="filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th className="col-amount">Amount</th>
            <th className="col-actions"></th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(t => (
            <tr key={t.id}>
              <td className="cell-date">{formatDate(t.date)}</td>
              <td className="cell-desc">{t.description}</td>
              <td className="cell-cat"><span className="tag">{t.category}</span></td>
              <td className={`cell-amount ${t.type === "income" ? "income-amount" : "expense-amount"}`}>
                {t.type === "income" ? "+" : "−"}{formatUSD(t.amount)}
              </td>
              <td className="cell-actions">
                <button className="delete-btn" onClick={() => handleDelete(t)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredTransactions.length === 0 && (
        <div className="ledger-empty">
          <p>
            {isFiltered
              ? "No entries match this filter."
              : "No entries yet. Record your first one above."}
          </p>
          {isFiltered && (
            <button className="clear-filters" onClick={clearFilters}>
              Show all entries
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default TransactionList;
