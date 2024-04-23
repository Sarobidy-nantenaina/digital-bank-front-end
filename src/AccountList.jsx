import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function AccountList() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("http://localhost:8080/accounts");
        if (!response.ok) {
          throw new Error("Failed to fetch accounts");
        }
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const formatDateOfBirth = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleRowClick = (accountId) => {
    navigate(`/account/${accountId}`);
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/accounts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete account");
      }

      // Rafraîchir la liste des comptes après la suppression
      const updatedAccounts = accounts.filter((account) => account.id !== id);
      setAccounts(updatedAccounts);
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Account List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Principal Balance</th>
            <th>Monthly Salary</th>
            <th>Account Number</th>
            <th>Overdraft Enabled</th>
            <th>Bank</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr
              key={account.id}
              onClick={() => handleRowClick(account.id)}
              style={{ cursor: "pointer" }}
            >
              <td>{account.id}</td>
              <td>{account.firstName}</td>
              <td>{account.lastName}</td>
              <td>{formatDateOfBirth(account.dateOfBirth)}</td>
              <td>{account.principalBalance} Ar</td>
              <td>{account.monthlySalary} Ar</td>
              <td>{account.accountNumber}</td>
              <td>{account.overdraftEnabled ? "Yes" : "No"}</td>
              <td>{account.bank}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(account.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountList;
