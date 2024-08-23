import React, {useEffect} from 'react';
import MainHeader from '../MainHeader';
import Footer from '../common/Footer';

const WelcomePage = () => {
  
  useEffect(() => {
    // Clear user data from local storage
    localStorage.removeItem("userEmail");
    localStorage.removeItem("Role");
    localStorage.removeItem("userID");
    localStorage.removeItem("AccessToken");
  }, []);


  return (
    <div>
      <MainHeader />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h1>EMedicine Portal</h1><br></br>
            <p style={{textAlign:"justify"}}>
              Welcome to our online store dedicated to providing you with a wide range of high-quality medicines and healthcare products. At our website, you can conveniently browse through our extensive catalog, place orders, and have your medications delivered right to your doorstep.        
              We strive to ensure a seamless shopping experience for our customers by offering competitive prices, secure payment options, and reliable delivery services. Whether you need prescription medications, over-the-counter drugs, vitamins, or personal care products, we have got you covered.
            </p>
            <p style={{textAlign:"justify"}}>
              Our team is committed to your well-being and satisfaction. If you have any questions or need assistance, feel free to reach out to our friendly customer support team. Thank you for choosing our Medicine E-commerce website for your healthcare needs.
            </p>
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <img src="../main-image.jpg" alt="Medicines" className="img-fluid rounded" />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default WelcomePage;
