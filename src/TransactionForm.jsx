import { useState } from 'react'

function TransactionForm({ categories, onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAdd({
      id: Date.now(),
      description,
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <div className="add-transaction">
      <h2 className="rcpt-h">Ring up an entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="field field-wide">
          <label htmlFor="tf-desc">Description</label>
          <input
            id="tf-desc"
            type="text"
            placeholder="What was it?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="tf-amount">Amount</label>
          <input
            id="tf-amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="tf-type">Direction</label>
          <select id="tf-type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Money in</option>
            <option value="expense">Money out</option>
          </select>
        </div>
        <div className="field field-wide">
          <label htmlFor="tf-category">Category</label>
          <select id="tf-category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button type="submit">Print entry</button>
      </form>
    </div>
  );
}

export default TransactionForm;
