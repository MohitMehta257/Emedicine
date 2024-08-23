import React from 'react';

const InnerFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer fixed-bottom navbar-dark bg-dark" style={{height: "auto", marginTop: "100px"}}>
      <div className="container py-3">
        <div className="row">
          <div className="col-md-4 text-white">
            <h5>Pages</h5>
            <ul className="list-unstyled">
              <li><a href="/aboutus" className="text-white">About Us</a></li>
              <li><a href="/contactus" className="text-white">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-md-4 text-white text-center">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="https://www.facebook.com" target='_blank' className="text-white mx-2"><i className="fab fa-facebook-f"></i></a>&nbsp;Facebook</li>
              <li><a href="https://www.youtube.com" target='_blank' className="text-white mx-2"><i className="fab fa-youtube"></i></a>&nbsp;Youtube </li>
              <li><a href="https://www.whatsapp.com" target='_blank' className="text-white mx-2"><i className="fab fa-whatsapp"></i></a>&nbsp;Whatsapp</li>
            </ul>
            
          </div>
          <div className="col-md-4 text-white">
            <h5>About</h5>
            <p className="mb-0">Medicine E-commerce is your go-to online pharmacy providing a wide range of medicines and healthcare products.</p>
          </div>
        </div>
        <div className="text-center mt-3">
          <span className="text-white">© {currentYear} EMedicine E-commerce. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default InnerFooter;
