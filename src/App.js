import React, { useState, useEffect } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    date: '',
    remarks: '',
    txn_type: '',
    credit: '',
    debit: '',
    balance: ''
  });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(storedTransactions);
  }, []);

  useEffect(() => {
    console.log(transactions)
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isEmpty = (obj) => {
    const values = Object.values(obj);
    return values.every(value => !value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const txn = transactions.length > 0 ? transactions[(transactions.length) - 1] : 0;
    let balance = txn ? txn.balance : 0;
    console.log(formData)
  if (isEmpty(formData)) {
      alert('All fields are required...!');
      return false;
    }

    let amt = formData.txn_type == 0 ? formData.credit : formData.debit;
    if (formData.txn_type == 0) {
      formData.balance = parseFloat(balance) + parseFloat(amt);
    } else {
      if (parseFloat(balance) >= parseFloat(amt)) {
        formData.balance = parseFloat(balance) - parseFloat(amt);
      } else {
        alert('Insufficient Balance...!');
        return false;
      }
    }
    const newTransaction = { ...formData };
    setTransactions([...transactions, newTransaction]);

    setFormData({
      date: '',
      remarks: '',
      txn_type: '',
      credit: '',
      debit: '',
      balance: ''
    });

  };

  return (
    <div>
      <h1>Add Transaction Record</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Remarks:
          <input
            type="text"
            name="remarks"
            value={formData.remarks}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Credit/Debit:
          <select name="txn_type" value={formData.txn_type} onChange={handleInputChange}>
            <option value="0">Credit</option>
            <option value="1">Debit</option>
          </select>

        </label>
        <br />
        <label>
          Amount:
          <input type="text" name={formData.txn_type == 0 ? 'credit' : 'debit'} value={formData.txn_type == 0 ? formData.credit : formData.debit} onChange={handleInputChange} />
        </label>

        <button type="submit">Add Transaction</button>
      </form>

      <h2>Transaction Records List</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Remarks</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Balance</th>

          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.date}</td>
              <td>{transaction.remarks}</td>
              <td>{transaction.credit ? transaction.credit : 0}</td>
              <td>{transaction.debit ? transaction.debit : 0}</td>
              <td>{transaction.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
