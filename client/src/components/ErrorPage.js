import React from "react";
import "../styles/errorpage.css";
import { useHistory } from "react-router-dom";
export default function ErrorPage() {
  const history = useHistory();
  return (
    <div className="error__extDiv">
      <h1>404</h1>
      <div className="error__centerDiv">
        <h2>we are sorry ,page not found !</h2>
        <p>
          THE PAGE you are lookingmight have been removed had its name changedor
          is temporary unavailable
        </p>
        <button
          onClick={() => {
            history.push("/");
          }}
        >
          BACK TO HOME PAGE
        </button>
      </div>
    </div>
  );
}
