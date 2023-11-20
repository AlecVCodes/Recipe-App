import React, { useRef, useState } from "react";
import FlavourFinderLogo from "../svg/FlavourFinderLogo";
import hamburgerIcon from "../images/Hamburger-menu.png";
import crossIcon from "../images/cross-icon.png";

function NavbarComponent() {
  // Navbar Refs
  const primaryHeader = useRef(null);
  const navToggleBtn = useRef(null);
  const primaryNav = useRef(null);
  const [navOpen, setNavOpen] = useState(false);
  const [navbarColour, setNavbarColour] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  //change navbar colour on scroll

  const changeColour = () => {
    if (window.scrollY >= 100) {
      setNavbarColour(true);
    } else {
      setNavbarColour(false);
    }
  };

  window.addEventListener("scroll", changeColour);

  return (
    <header
      className={navbarColour ? `primary-header active` : `primary-header`}
      ref={primaryHeader}
    >
      {navOpen ? <div className="box-shadow-overlay"></div> : null}
      <div className="container">
        <div className="nav-wrapper">
          <li>
            <FlavourFinderLogo />
          </li>
          <button
            onClick={toggleNav} // Toggle the navOpen state on button click
            ref={navToggleBtn}
            className="mobile-nav-toggle"
            aria-aria-controls="primary-navigation"
          >
            <img
              className="icon-hamburger"
              src={hamburgerIcon}
              alt=""
              aria-hidden="true"
            ></img>
            <img
              className="icon-close"
              src={crossIcon}
              alt=""
              aria-hidden="true"
            ></img>
            <span className="visually-hidden">Menu</span>
          </button>
          <nav
            className={`primary-navigation ${navOpen ? "open" : ""}`}
            id="primary-navigation"
            ref={primaryNav}
          >
            <ul aria-label="Primary" role="list" className="nav-list">
              <li>Home</li>
              <li>Recipes</li>
              <li>Tutorials</li>
              <li>Shop</li>
            </ul>
          </nav>
          <button className="curved-btn | display-sm-none display-md-inline-flex">
            Contact
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavbarComponent;
