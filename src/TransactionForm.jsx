import { useState } from 'react'

function TransactionForm({ categories, onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedDescription = description.trim();
    const parsedAmount = parseFloat(amount);
    if (!trimmedDescription || !Number.isFinite(parsedAmount) || parsedAmount <= 0) return;

    // Local calendar date; toISOString() would give the UTC date.
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

    onAdd({
      id: Date.now(),
      description: trimmedDescription,
      amount: parsedAmount,
      type,
      category,
      date,
    });
    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <section className="add-transaction">
      <h2>Add a transaction</h2>
      <form onSubmit={handleSubmit}>
        <fieldset className="type-toggle">
          <legend className="visually-hidden">Type</legend>
          {["expense", "income"].map(option => (
            <label key={option} className={type === option ? "selected" : ""}>
              <input
                type="radio"
                name="type"
                value={option}
                checked={type === option}
                onChange={(e) => setType(e.target.value)}
              />
              {option === "expense" ? "Expense" : "Income"}
            </label>
          ))}
        </fieldset>
        <label className="field field-description">
          <span>Description</span>
          <input
            type="text"
            placeholder="Groceries"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="field field-amount">
          <span>Amount</span>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label className="field field-category">
          <span>Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <button type="submit">Add transaction</button>
      </form>
    </section>
  );
}

export default TransactionForm
