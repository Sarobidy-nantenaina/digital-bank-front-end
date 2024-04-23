import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css";

function AccountStatementFilter() {
  const { accountId } = useParams();
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [filteredStatements, setFilteredStatements] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const handleFilter = async () => {
    try {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      console.log("Start Date:", formattedStartDate, typeof formattedStartDate);
      console.log("End Date:", formattedEndDate, typeof formattedEndDate);
      const response = await fetch(
        `http://localhost:8080/accountStatements/generate/${accountId}?startDate=${startDate}&endDate=${endDate}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Account statements generated successfully:", data);
        setFilteredStatements(data);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
      } else {
        console.error("Failed to generate account statements");
      }
    } catch (error) {
      console.error("Error generating account statements:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const generateReference = (effectiveDate, index) => {
    const date = effectiveDate.split("T")[0];
    return `VIR_${date}_${(index + 1).toString().padStart(2, "0")}`;
  };

  return (
    <div className="container mt-3">
      <h2>Account Statement Filter</h2>
      <div className="row">
        <div className="col">
          <label>Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col">
          <label>End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick={handleFilter}>
            Filter
          </button>
        </div>
      </div>
      {showMessage && (
        <div className="alert alert-success mt-3" role="alert">
          AccountStatement filtered successfully
        </div>
      )}
      <div className="mt-3">
        <h3>Filtered Account Statements</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Effective Date</th>
              <th>Motive</th>
              <th>Principal Balance</th>
              <th>Credit MGA</th>
              <th>Debit MGA</th>
              <th>Reference</th>
            </tr>
          </thead>
          <tbody>
            {filteredStatements.map((statement, index) => (
              <tr key={statement.id}>
                <td>{statement.effectiveDate}</td>
                <td>{statement.motive}</td>
                <td>{statement.principalBalance}</td>
                <td>{statement.creditMga}</td>
                <td>{statement.debitMga}</td>
                <td>{generateReference(statement.effectiveDate, index)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AccountStatementFilter;
