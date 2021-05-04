import React, { useContext } from "react";
import "../styles/nav.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

export default function Nav() {
  const { state } = useContext(UserContext);
  return (
    <div className="nav__container" style={{ backgroundColor: "#004643" }}>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <Link className="navbar-brand" to="/">
          <h3 style={{ color: "#fffffe", letterSpacing: "3px" }}>MERN</h3>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav justify-content-end align__right">
            <li className="nav-item active">
              <Link
                className="nav-link"
                to="/"
                style={{
                  color: "#fffffe",
                  fontWeight: "600",
                  letterSpacing: "1px",
                }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={{
                  color: "#fffffe",
                  fontWeight: "600",
                  letterSpacing: "1px",
                }}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={{
                  color: "#fffffe",
                  fontWeight: "600",
                  letterSpacing: "1px",
                }}
                to="/contact"
              >
                Contact
              </Link>
            </li>
            {!state ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link "
                    style={{
                      color: "#fffffe",
                      fontWeight: "600",
                      letterSpacing: "1px",
                    }}
                    to="/login"
                    tabIndex="-1"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link "
                    style={{
                      color: "#fffffe",
                      fontWeight: "600",
                      letterSpacing: "1px",
                    }}
                    to="/register"
                    tabIndex="-1"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link
                  className="nav-link "
                  style={{
                    color: "#fffffe",
                    fontWeight: "600",
                    letterSpacing: "1px",
                  }}
                  to="/logout"
                  tabIndex="-1"
                >
                  logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
