import React from 'react';
import "bootstrap-icons/font/bootstrap-icons.css"; 

const Footer = () => {
  return (
    <footer className="bg-dark bg-gradient text-center text-white">
      <div className="container p-4 pb-0">
        <section className="mb-4">
          <a
            className="btn text-white btn-floating m-1 rounded-5"
            style={{ backgroundColor: "#3b5998" }}
            href="https://web.facebook.com/Meta?_rdc=1&_rdr"
            role="button"
          >
            <i className="bi-facebook"></i> {/* Use "bi-facebook" */}
          </a>
         
          
          <a
            className="btn text-white btn-floating m-1 rounded-5"
            style={{ backgroundColor: "#FD1D1D" }}
            href="https://www.instagram.com/"
            role="button"
          >
            <i className="bi-instagram"></i> {/* Use "bi-instagram" */}
          </a>
          <a
            className="btn text-white btn-floating m-1 rounded-5"
            style={{ backgroundColor: "#0082ca" }}
            href="https://www.linkedin.com/in/supun-jayaweera"
            role="button"
          >
            <i className="bi-linkedin"></i> {/* Use "bi-linkedin" */}
          </a>
          <a
            className="btn text-white btn-floating m-1 rounded-5"
            style={{ backgroundColor: "#333333" }}
            href="https://github.com/SupunJayaweera"
            role="button"
          >
            <i className="bi-github"></i> {/* Use "bi-github" */}
          </a>
        </section>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
        © 2023 Copyright:
        <a className="text-white" href="https://mdbootstrap.com/"> Beat Max</a>
        <p>Contact : +94 771794347 <br/> Email: supunjayaweera3@gmail.com</p>
        
      </div>
    </footer>
  );
};

export default Footer;
