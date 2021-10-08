import React, { useContext } from "react";
import "../styles/nav.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link ,useHistory} from "react-router-dom";
import { UserContext } from "../App";

export default function Nav() {
  const { state,dispatch } = useContext(UserContext);
  const history = useHistory();
  
  const logoutHandler=()=>{
    fetch("/api/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        dispatch({ type: "USER", payload: false });
        history.push("/login");
        if (res.status !== 201) {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="nav__container" style={{ backgroundColor: "#8AA1B1" }}>
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
                 
                }}
                to="/contact"
              >
                Contact
              </Link>
            </li>
            {
            !state ? (
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
                <div
                  className="nav-link "
                  style={{
                    color: "#fffffe",
                    fontWeight: "600",
                    letterSpacing: "1px",
                    cursor:"pointer"
                  }}
                  onClick={logoutHandler}
                  tabIndex="-1"
                >
                  logout
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
