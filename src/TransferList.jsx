import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css";

function TransferList() {
  const { accountId } = useParams();
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/transferts/sender/${accountId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch transfers");
        }
        const data = await response.json();
        setTransfers(data);
      } catch (error) {
        console.error("Error fetching transfers:", error);
      }
    };

    fetchTransfers();
  }, [accountId]);

  // Fonction pour formater la date au format "04 Avril 2024"
  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd MMMM yyyy 'at' HH'h' : mm");
  };

  // Fonction pour supprimer un transfert
  const handleDeleteTransfer = async (transferId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/transferts/${transferId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete transfer");
      }

      const updatedTransfers = transfers.filter(
        (transfer) => transfer.id !== transferId
      );
      setTransfers(updatedTransfers);
    } catch (error) {
      console.error("Error deleting transfer:", error);
    }
  };

  const handleCancelTransfer = async (transferId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/transferts/cancel/${transferId}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel transfer");
      }

      const updatedTransfers = transfers.map((transfer) => {
        if (transfer.id === transferId) {
          return { ...transfer, status: "Cancelled" };
        }
        return transfer;
      });
      setTransfers(updatedTransfers);
    } catch (error) {
      console.error("Error cancelling transfer:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Transfer List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Sender Account ID</th>
            <th>Recipient Account ID</th>
            <th>Amount</th>
            <th>Reason</th>
            <th>Effective Date</th>
            <th>Registration Date</th>
            <th>Status</th>
            <th>Label</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transfers
            .filter(
              (transfer) =>
                transfer.status === "PENDING" ||
                transfer.status === "COMPLETED_PENDING"
            )
            .map((transfer) => (
              <tr key={transfer.id}>
                <td>{transfer.senderAccountId}</td>
                <td>{transfer.recipientAccountId}</td>
                <td>{transfer.amount}</td>
                <td>{transfer.reason}</td>
                <td>{formatDate(transfer.effectiveDate)}</td>
                <td>{formatDate(transfer.registrationDate)}</td>
                <td>{transfer.status}</td>
                <td>{transfer.label}</td>
                <td>
                  {transfer.status === "COMPLETED" && (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteTransfer(transfer.id)}
                    >
                      Delete
                    </button>
                  )}
                  {transfer.status === "PENDING" && (
                    <button
                      className="btn btn-warning"
                      onClick={() => handleCancelTransfer(transfer.id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransferList;
