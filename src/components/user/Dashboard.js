import React from "react";
import Header from "../common/Header";
import InnerFooter from "../common/InnerFooter";

const Dashboard = () => {  
  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
            <div className="card-header">Welcome <b> {localStorage.getItem("userEmail")} </b></div>    
            </div>
          </div>
        </div>    
      </div>
      <InnerFooter />
    </>
  );
};

export default Dashboard;
