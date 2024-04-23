import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function AccountForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    monthlySalary: "",
    bank: "BFV",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Formater la date au format YYYY-MM-DD
    const formattedDate = new Date(formData.dateOfBirth)
      .toISOString()
      .split("T")[0];
    // Mettre à jour formData avec la date formatée
    setFormData({
      ...formData,
      dateOfBirth: formattedDate,
    });
    try {
      // Envoi de la requête avec formData contenant la date formatée
      const response = await fetch("http://localhost:8080/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to create account");
      }
      // Réinitialiser le formulaire après la création du compte
      setFormData({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        monthlySalary: "",
        bank: "BFV",
      });
      navigate("/list-accounts");
    } catch (error) {
      console.error("Error creating account:", error);
      // Gérer les erreurs de création de compte ici
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2 className="mb-0">Create Account</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dateOfBirth" className="form-label">
                Birthday
              </label>
              <input
                type="date"
                className="form-control"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="monthlySalary" className="form-label">
                Monthly Salary
              </label>
              <input
                type="number"
                className="form-control"
                id="monthlySalary"
                name="monthlySalary"
                value={formData.monthlySalary}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="bank" className="form-label">
                Bank
              </label>
              <select
                className="form-select"
                id="bank"
                name="bank"
                value={formData.bank}
                onChange={handleChange}
                required
              >
                <option value="BFV">BFV</option>
                <option value="BMOI">BMOI</option>
                <option value="BNI">BNI</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountForm;
