import React from "react";
import MainHeader from '../MainHeader';
import Footer from '../common/Footer';
const ContactUs = () => {
  return (
    <div>
      <MainHeader />
      <div className="container mt-5">
        <h2>Contact Us</h2>
        <p>
          Feel free to get in touch with us for any queries or assistance. Our
          dedicated customer support team is here to help you.
        </p>
        <p>Address: 123 Medicine Street, Cityville, Country</p>
        <p>Phone: +1 (123) 456-7890</p>
        <p>Email: info@medicineecommerce.com</p>
        <p>We look forward to hearing from you!</p>
        <div style={{ height: "400px", width: "100%" }}>
          {/* Google Maps Embed API */}
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.678901234567!2dYOUR_LONGITUDE!3dYOUR_LATITUDE!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDM1JzM4LjMiTiA3N8KwMTQnMDguNyJX!5e0!3m2!1sen!2sus!4v1623418874000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
