import React from "react";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";


function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">{children}</div>
    </div>
  );
}

export default Layout;
