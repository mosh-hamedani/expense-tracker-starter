import { useState } from 'react'
import './App.css'
import Summary from './Summary'
import CategoryChart from './CategoryChart'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: 5000, type: "income", category: "salary", date: "2025-01-01" },
    { id: 2, description: "Rent", amount: 1200, type: "expense", category: "housing", date: "2025-01-02" },
    { id: 3, description: "Groceries", amount: 150, type: "expense", category: "food", date: "2025-01-03" },
    { id: 4, description: "Freelance Work", amount: 800, type: "expense", category: "salary", date: "2025-01-05" },
    { id: 5, description: "Electric Bill", amount: 95, type: "expense", category: "utilities", date: "2025-01-06" },
    { id: 6, description: "Dinner Out", amount: 65, type: "expense", category: "food", date: "2025-01-07" },
    { id: 7, description: "Gas", amount: 45, type: "expense", category: "transport", date: "2025-01-08" },
    { id: 8, description: "Netflix", amount: 15, type: "expense", category: "entertainment", date: "2025-01-10" },
  ]);

  const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const printed = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <div className="counter">
      <div className="receipt">
        <div className="tear tear-top" aria-hidden="true"></div>

        <div className="receipt-inner">
          <header className="rcpt-head">
            <div className="merchant">Finance Tracker</div>
            <p className="rcpt-meta">Personal account · cash &amp; cards</p>
            <p className="rcpt-meta rcpt-meta-strong">Register #1 — {printed}</p>
          </header>

          <Summary transactions={transactions} />

          <CategoryChart transactions={transactions} />

          <TransactionForm categories={categories} onAdd={addTransaction} />

          <TransactionList transactions={transactions} categories={categories} onDelete={deleteTransaction} />
        </div>

        <div className="tear tear-bottom" aria-hidden="true"></div>
      </div>
    </div>
  );
}

export default App
