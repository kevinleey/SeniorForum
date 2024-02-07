import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <footer>
      <div id="footer-container">
        <div id="ua-footer-img">
          <img
            src="https://caregiverconnect.ua.edu/uploads/1/4/0/5/140558596/_1666557.png"
            alt="Logo"
          />
        </div>
        <div id="footer-text">
          <p>
            <a href="https://accessibility.ua.edu/statement/">Accessibility</a>{" "}
            | <a href="https://eop.ua.edu/">Equal Opportunity</a> |{" "}
            <a href="https://www.ua.edu/disclaimer">Site Disclaimer</a> |{" "}
            <a href="https://www.ua.edu/privacy">Privacy</a>
          </p>
          <p>
            <a href="https://www.ua.edu/copyright">Copyright © 2022 </a> |{" "}
            <a href="https://www.ua.edu/">The University of Alabama</a> |
            Tuscaloosa, AL 35487 | (205) 348-6010
          </p>
          <p>
            Website provided by the{" "}
            <a href="https://cit.ua.edu/">
              Center for Instructional Technology
            </a>
            , <a href="https://oit.ua.edu/">Office of Information Technology</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
