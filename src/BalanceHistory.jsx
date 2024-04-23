import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function BalanceHistory() {
  const { accountId } = useParams();
  const [balanceHistory, setBalanceHistory] = useState([]);

  useEffect(() => {
    fetchBalanceHistory();
  }, []);

  const fetchBalanceHistory = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/balanceHistories/${accountId}/all`
      );
      if (response.ok) {
        const data = await response.json();
        // Format the history date
        const formattedData = data.map((item) => ({
          ...item,
          historyDate: new Date(item.historyDate).toLocaleDateString("en-US"),
        }));
        setBalanceHistory(formattedData);
      } else {
        console.error("Failed to fetch balance history");
      }
    } catch (error) {
      console.error("Error fetching balance history:", error);
    }
  };

  return (
    <div className="container mt-3">
      <h2>Balance History</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Principal Balance</th>
            <th>Loan Amount</th>
            <th>Interest Amount</th>
            <th>History Date</th>
          </tr>
        </thead>
        <tbody>
          {balanceHistory.map((item, index) => (
            <tr key={index}>
              <td>{item.principalBalance}</td>
              <td>{item.loanAmount}</td>
              <td>{item.interestAmount}</td>
              <td>{item.historyDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BalanceHistory;
