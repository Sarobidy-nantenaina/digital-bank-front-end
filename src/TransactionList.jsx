import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css";

function TransactionList() {
  const { accountId } = useParams();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/transactions/account/${accountId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [accountId]);

  const formatDateTime = (dateTime) => {
    return format(new Date(dateTime), "dd MMMM yyyy 'at' HH'h' : mm");
  };

  return (
    <div>
      <h2>Transactions</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Motive</th>
            <th>Date Time</th>
            <th>Type</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.amount}</td>
              <td>{transaction.motive}</td>
              <td>{formatDateTime(transaction.dateTime)}</td>
              <td>{transaction.type}</td>
              <td>{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
