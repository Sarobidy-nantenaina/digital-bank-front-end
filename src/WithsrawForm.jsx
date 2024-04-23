import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function WithdrawForm() {
  const [formData, setFormData] = useState({
    amount: "",
    motive: "",
    category: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { accountId } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "amount" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Data sent to backend:", formData); // Ajout du console.log

      const response = await fetch(
        `http://localhost:8080/transactions/withdraw/${accountId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate(`/account/${accountId}`);
        }, 3000);
      } else {
        console.error("Erreur lors de la soumission du formulaire.");
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Withdraw Form</h2>
      {isSuccess && (
        <div className="alert alert-success" role="alert">
          Withdrawing successfully!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="motive" className="form-label">
            Motive
          </label>
          <input
            type="text"
            className="form-control"
            id="motive"
            name="motive"
            value={formData.motive}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Food & Drink">Food & Drink</option>
            <option value="Shopping and online shops">
              Shopping and online shops
            </option>
            <option value="Accommodation">Accommodation</option>
            <option value="Transport">Transport</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Leisure">Leisure</option>
            <option value="Multimedia, IT">Multimedia, IT</option>
            <option value="Financial expenses">Financial expenses</option>
            <option value="Investments">Investments</option>
            <option value="Income">Income</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default WithdrawForm;
