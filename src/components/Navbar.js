import React, { useState } from "react";
import { Link } from "gatsby";
import github from "../img/whatshap.png";
import logo from "../img/go.png";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" title="Logo">
            <img 
              src={logo} 
              alt="Niana Bakery Logo" 
              style={{ maxWidth: "150px", height: "auto" }} 
            />
          </Link>
          {/* Hamburger menu */}
          <button
            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
            aria-expanded={isActive}
            aria-label={isActive ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsActive(!isActive)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
        <ul
          id="navMenu"
          className={`navbar-start has-text-centered navbar-menu ${
            isActive ? "is-active" : ""
          }`}
        >
          <li className="navbar-item" style={{ padding: "0px" }}>
            <Link className="navbar-item" to="/about">
              About
            </Link>
          </li>
          <li className="navbar-item" style={{ padding: "0px" }}>
            <Link className="navbar-item" to="/products">
              Products
            </Link>
          </li>
          <li className="navbar-item" style={{ padding: "0px" }}>
            <Link className="navbar-item" to="/blog">
              Blog
            </Link>
          </li>
          {/* <li className="navbar-item" style={{ padding: "0px" }}>
            <Link className="navbar-item" to="/contact/examples">
              Form Examples
            </Link>
          </li> */}
          <li className="navbar-end has-text-centered">
            <a
              className="navbar-item"
              href="https://wa.me/6288212538241"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon">
                <img 
                  src={github} 
                  alt="WhatsApp contact" 
                  style={{ maxWidth: "30px", height: "auto" }} 
                />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
