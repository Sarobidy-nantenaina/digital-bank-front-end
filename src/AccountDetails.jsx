import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function AccountDetails() {
  const { accountId } = useParams();
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [overdraftEnabled, setOverdraftEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/accounts/${accountId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch account details");
        }
        const data = await response.json();
        setAccount(data);
        setOverdraftEnabled(data.overdraftEnabled);
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };

    fetchAccountDetails();
  }, [accountId]);

  const handleImproviseClick = () => {
    navigate(`/account/${accountId}/improvise`);
  };

  const handleTransactionsClick = () => {
    navigate(`/account/${accountId}/allTransactions`);
  };

  const handleMakeTransferClick = () => {
    navigate(`/transferts/transferProcess/${accountId}`);
  };

  const handleToggleOverdraftClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/accounts/${
          overdraftEnabled ? "disable" : "enable"
        }/${accountId}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to ${overdraftEnabled ? "disable" : "enable"} overdraft`
        );
      }

      console.log(
        `Overdraft ${overdraftEnabled ? "disabled" : "enabled"} successfully`
      );
      window.location.reload();
    } catch (error) {
      console.error(
        `Error ${overdraftEnabled ? "disabling" : "enabling"} overdraft:`,
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdrawClick = () => {
    navigate(`/account/withdraw/${accountId}`);
  };

  const handleTransfersClick = () => {
    navigate(`/transfers/account/${accountId}`);
  };

  const handleTransferHistoryClick = () => {
    navigate(`/transferHistories/account/${accountId}`);
  };

  const handleAccountStatementClick = () => {
    navigate(`/accountStatement/account/${accountId}`);
  };

  const handleBalanceHistoryClick = () => {
    navigate(`/balanceHistories/account/${accountId}`);
  };

  if (!account) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Account Details</h2>
      <div>
        <p>
          <strong>First Name:</strong> {account.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {account.lastName}
        </p>
        <p>
          <strong>Date of Birth:</strong> {account.dateOfBirth}
        </p>
        <p>
          <strong>Principal Balance:</strong> {account.principalBalance} Ar
        </p>
        <p>
          <strong>Monthly Salary:</strong> {account.monthlySalary} Ar
        </p>
        <p>
          <strong>Account Number:</strong> {account.accountNumber}
        </p>
        <p>
          <strong>Overdraft Enabled:</strong>{" "}
          {account.overdraftEnabled ? "Yes" : "No"}
        </p>
        <p>
          <strong>Bank:</strong> {account.bank}
        </p>
      </div>
      <div className="mt-3">
        <button className="btn btn-primary m-2" onClick={handleImproviseClick}>
          Improvise
        </button>
        <button className="btn btn-primary m-2" onClick={handleWithdrawClick}>
          Withdraw
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={handleTransactionsClick}
        >
          Your Transactions
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={handleMakeTransferClick}
        >
          Make Transfer
        </button>
        <button className="btn btn-primary m-2" onClick={handleTransfersClick}>
          Your transfer in progress
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={handleTransferHistoryClick}
        >
          view your transfer history
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={handleAccountStatementClick}
        >
          Make AccountStatement
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={handleBalanceHistoryClick}
        >
          View your Balance History
        </button>
        <button
          className="btn btn-success"
          onClick={handleToggleOverdraftClick}
          disabled={isLoading}
        >
          {isLoading
            ? "Loading..."
            : `${overdraftEnabled ? "Disable" : "Enable"} Overdraft`}
        </button>
      </div>
    </div>
  );
}

export default AccountDetails;
