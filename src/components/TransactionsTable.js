import React from 'react';
import '../App.css';

function TransactionTable({ transactions }) {
  console.log("THIS IS THE TRANSACTION TABLE", JSON.stringify(transactions));
  return (
    <div className='App'>
      <table className='table table-responsive table-hover table-dark'>
        <thead>
          <tr>
            <th>NO</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={transaction.id}>
              <td>{index + 1}</td>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.date}</td>
              <td>{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
