import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";


const AdminDashboard = () => {
 
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
      <Footer />
    </>
  );
};

export default AdminDashboard;
