import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import AccountList from "./AccountList";
import AccountForm from "./AccountForm";
import AccountDetails from "./AccountDetails";
import ImproviseForm from "./ImproviseForm";
import TransactionList from "./TransactionList";
import TransferForm from "./TransferForm";
import WithdrawForm from "./WithsrawForm";
import TransferList from "./TransferList";
import TransferHistoryList from "./TransfeHistoryList";
import AccountStatementFilter from "./AccountStatementFIlter";
import BalanceHistory from "./BalanceHistory";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/createAccount" element={<AccountForm />} />
          <Route path="/list-accounts" element={<AccountList />} />
          <Route path="/account/:accountId" element={<AccountDetails />} />
          <Route
            path="/account/:accountId/improvise"
            element={<ImproviseForm />}
          />
          <Route
            path="/account/:accountId/allTransactions"
            element={<TransactionList />}
          />
          <Route
            path="/transferts/transferProcess/:accountId"
            element={<TransferForm />}
          />
          <Route
            path="/account/withdraw/:accountId"
            element={<WithdrawForm />}
          />
          <Route
            path="/transfers/account/:accountId"
            element={<TransferList />}
          />
          <Route
            path="/transferHistories/account/:accountId"
            element={<TransferHistoryList />}
          />
          <Route
            path="/accountStatement/account/:accountId"
            element={<AccountStatementFilter />}
          />
          <Route
            path="/balanceHistories/account/:accountId"
            element={<BalanceHistory />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
