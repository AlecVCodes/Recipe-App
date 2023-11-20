import React from "react";
import { Link } from "react-router-dom";
import LogoFooter from "../images/Logo-footer.png";
import Chevron from "../svg/Chevron";

function FooterComponent() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-logo">
          <Link to="/">
            {" "}
            <img src={LogoFooter}></img>
          </Link>
        </div>

        {/*Social Media Icons */}
        <div className="footer-socials">
          <p>The company that brings culinary creativity to life...</p>

          <div className="icons">
            <a href="#">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="16" cy="16" r="16" fill="white" />
                <path
                  d="M23.6591 12.2422C23.0867 12.4954 22.4798 12.6617 21.8583 12.7357C22.5131 12.3435 23.0031 11.7267 23.2368 11.0002C22.6218 11.3662 21.9476 11.6227 21.2456 11.7614C20.7735 11.2564 20.1479 10.9214 19.4658 10.8086C18.7838 10.6958 18.0835 10.8116 17.474 11.1378C16.8645 11.464 16.3799 11.9825 16.0954 12.6125C15.811 13.2426 15.7427 13.949 15.9011 14.6219C14.6538 14.5595 13.4336 14.2355 12.3196 13.6708C11.2057 13.1062 10.223 12.3136 9.43534 11.3444C9.15656 11.8233 9.01006 12.3676 9.01084 12.9217C9.01084 14.0092 9.56509 14.9699 10.4058 15.5324C9.90785 15.5167 9.42083 15.3822 8.98534 15.1402V15.1784C8.98532 15.9028 9.23587 16.605 9.69449 17.1657C10.1531 17.7264 10.7916 18.1113 11.5016 18.2549C11.0393 18.3803 10.5546 18.3988 10.0841 18.3089C10.2843 18.9325 10.6745 19.4778 11.2001 19.8685C11.7257 20.2592 12.3603 20.4757 13.0151 20.4877C12.3644 20.9988 11.6193 21.3766 10.8224 21.5995C10.0255 21.8224 9.19256 21.886 8.37109 21.7867C9.80488 22.7087 11.4739 23.1982 13.1786 23.1967C18.9491 23.1967 22.1036 18.4169 22.1036 14.2717C22.1036 14.1367 22.1006 14.0002 22.0946 13.8659C22.7084 13.4222 23.2382 12.8719 23.6591 12.2422Z"
                  fill="black"
                />
              </svg>
            </a>
            <a href="#">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="16" cy="16" r="16" fill="white" />
                <path
                  d="M17.0837 17.6872H19.0628L19.8545 14.5205H17.0837V12.9372C17.0837 12.1218 17.0837 11.3538 18.667 11.3538H19.8545V8.69384C19.5964 8.6598 18.6219 8.58301 17.5927 8.58301C15.4433 8.58301 13.917 9.8948 13.917 12.3038V14.5205H11.542V17.6872H13.917V24.4163H17.0837V17.6872Z"
                  fill="#1D1D1D"
                />
              </svg>
            </a>
            <a href="#">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="16" cy="16" r="16" fill="white" />
                <path
                  d="M15.9978 13.3322C14.5289 13.3322 13.3301 14.531 13.3301 16C13.3301 17.469 14.5289 18.6678 15.9978 18.6678C17.4668 18.6678 18.6656 17.469 18.6656 16C18.6656 14.531 17.4668 13.3322 15.9978 13.3322ZM23.9991 16C23.9991 14.8953 24.0091 13.8005 23.9471 12.6978C23.885 11.4169 23.5928 10.2801 22.6562 9.3435C21.7176 8.40487 20.5829 8.11467 19.302 8.05263C18.1973 7.99059 17.1026 8.0006 15.9999 8.0006C14.8951 8.0006 13.8004 7.99059 12.6977 8.05263C11.4168 8.11467 10.2801 8.40687 9.34348 9.3435C8.40486 10.2821 8.11467 11.4169 8.05263 12.6978C7.99059 13.8025 8.0006 14.8973 8.0006 16C8.0006 17.1027 7.99059 18.1995 8.05263 19.3022C8.11467 20.5831 8.40686 21.7199 9.34348 22.6565C10.2821 23.5951 11.4168 23.8853 12.6977 23.9474C13.8024 24.0094 14.8971 23.9994 15.9999 23.9994C17.1046 23.9994 18.1993 24.0094 19.302 23.9474C20.5829 23.8853 21.7196 23.5931 22.6562 22.6565C23.5948 21.7179 23.885 20.5831 23.9471 19.3022C24.0111 18.1995 23.9991 17.1047 23.9991 16ZM15.9978 20.1048C13.7264 20.1048 11.8932 18.2715 11.8932 16C11.8932 13.7285 13.7264 11.8952 15.9978 11.8952C18.2693 11.8952 20.1025 13.7285 20.1025 16C20.1025 18.2715 18.2693 20.1048 15.9978 20.1048ZM20.2707 12.6858C19.7403 12.6858 19.312 12.2575 19.312 11.7271C19.312 11.1968 19.7403 10.7685 20.2707 10.7685C20.801 10.7685 21.2293 11.1968 21.2293 11.7271C21.2294 11.853 21.2048 11.9778 21.1566 12.0942C21.1085 12.2105 21.0379 12.3163 20.9489 12.4053C20.8598 12.4944 20.7541 12.565 20.6377 12.6131C20.5213 12.6612 20.3966 12.6859 20.2707 12.6858Z"
                  fill="#1D1D1D"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-links col-1">
          <h4>About Us</h4>
          <div className="footer-links-menu">
            <li>Who Are We?</li>
            <li>Careers</li>
            <li>Values</li>
          </div>
          <Chevron
            rotation={0}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <div className="footer-links col-2">
          <h4>Quick Links</h4>
          <div className="footer-links-menu">
            <li>Home</li>
            <li>Blogs</li>
          </div>

          <Chevron
            rotation={0}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <div className="footer-links col-3">
          <h4>Support</h4>
          <div className="footer-links-menu">
            <li>FAQ</li>
            <li>How It Works</li>
            <li>Privacy & Policy</li>
          </div>
          <Chevron
            rotation={0}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <div className="footer-links col-4">
          <h4>Get In Touch</h4>
          <div className="footer-links-menu">
            <li>(+61) 412 345 678</li>
            <li>FlavourFinder@gmail.com</li>
          </div>
          <Chevron
            rotation={0}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
