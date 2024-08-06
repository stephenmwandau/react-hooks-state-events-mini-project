import { useEffect, useState } from 'react';
import '../App.css';
import TransactionTable from './TransactionsTable';

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:3000/transactions");
      const data = await response.json();
      console.log(JSON.stringify(data));
      setTransactions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    const newTransaction = {
      description,
      amount,
      date,
      category
    };
    try {
      const response = await fetch("http://localhost:3000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTransaction)
      });
      if (response.ok) {
        const data = await response.json();
        setTransactions([...transactions, data]);
        setDescription('');
        setAmount('');
        setDate('');
        setCategory('');
      } else {
        console.error('Failed to add transaction');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='App'>
      <h2>Transactions</h2>
      <form onSubmit={handleAddTransaction}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        <button type="submit">Add Transaction</button>
      </form>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by description"
      />

      <TransactionTable transactions={filteredTransactions} />
    </div>
  );
}

export default Home;
