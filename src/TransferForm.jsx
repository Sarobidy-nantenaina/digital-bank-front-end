import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css";

function TransferForm() {
  const { accountId } = useParams();
  const [transferData, setTransferData] = useState({
    senderAccountId: accountId,
    recipientAccountId: "",
    amount: "",
    reason: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: format(new Date(), "HH:mm"),
    label: "",
  });
  const [isTransferSuccess, setIsTransferSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransferData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDateTime = `${transferData.date}T${transferData.time}`;
      const payload = {
        ...transferData,
        effectiveDate: new Date(formattedDateTime).toISOString(),
      };

      const response = await fetch(
        "http://localhost:8080/transferts/transferProcess",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit transfer data");
      }

      setIsTransferSuccess(true);

      setTimeout(() => {
        navigate(`/list-accounts`);
      }, 3000);

      console.log("Transfer data submitted successfully");
    } catch (error) {
      console.error("Error submitting transfer data:", error);
    }
  };

  return (
    <div className="container mt-3">
      <h2>Transfer Funds</h2>
      {isTransferSuccess && (
        <div className="alert alert-success" role="alert">
          Transfer successful!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Recipient Account ID</label>
          <input
            type="text"
            className="form-control"
            name="recipientAccountId"
            value={transferData.recipientAccountId}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            className="form-control"
            name="amount"
            value={transferData.amount}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Reason</label>
          <input
            type="text"
            className="form-control"
            name="reason"
            value={transferData.reason}
            onChange={handleChange}
          />
        </div>
        <div className="form-group d-flex">
          <div className="m-2">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={transferData.date}
              onChange={handleChange}
            />
          </div>
          <div className="m-2">
            <label>Time</label>
            <input
              type="time"
              className="form-control"
              name="time"
              value={transferData.time}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Label</label>
          <input
            type="text"
            className="form-control"
            name="label"
            value={transferData.label}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default TransferForm;
