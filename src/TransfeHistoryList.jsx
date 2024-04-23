import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css";

function TransferHistoryList() {
  const { accountId } = useParams();
  const [transfertHistories, setTransfertHistories] = useState([]);

  useEffect(() => {
    const fetchTransfertHistories = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/transfertHistories/account/${accountId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch transfer histories");
        }
        const data = await response.json();
        setTransfertHistories(data);
      } catch (error) {
        console.error("Error fetching transfer histories:", error);
      }
    };

    fetchTransfertHistories();
  }, [accountId]);

  // Fonction pour formater la date au format "04 Avril 2024"
  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd MMMM yyyy 'at' HH'h' : mm");
  };

  // Fonction pour supprimer un historique de transfert
  const handleDeleteHistory = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/transfertHistories/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete transfer history");
      }

      const updatedHistories = transfertHistories.filter(
        (history) => history.id !== id
      );
      setTransfertHistories(updatedHistories);
    } catch (error) {
      console.error("Error deleting transfer history:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Transfer History List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Transfert ID</th>
            <th>Sender Account ID</th>
            <th>Recipient Account ID</th>
            <th>Amount</th>
            <th>Reason</th>
            <th>Registration Date</th>
            <th>Transfert Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transfertHistories.map((history) => (
            <tr key={history.id}>
              <td>{history.transfertId}</td>
              <td>{history.senderAccountId}</td>
              <td>{history.recipientAccountId}</td>
              <td>{history.amount}</td>
              <td>{history.reason}</td>
              <td>{formatDate(history.registrationDate)}</td>
              <td>{history.transfertStatus}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteHistory(history.id)}
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

export default TransferHistoryList;
