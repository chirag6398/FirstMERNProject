import React, { useContext, useState, useEffect, useRef } from "react";
import "../styles/login.css";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import loginIllustrator from "../images/login.svg";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { TweenMax, Power4 } from "gsap";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
export default function Login() {
  const {  dispatch } = useContext(UserContext);
  let divRef = useRef(null);
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [proccesing,setProcessing]=useState(false);
  const [successed,setSuccessed]=useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const showPasswordHandle = () => {
    setShowPassword(!showPassword);
  };
  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setProcessing(true);
      const res = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
     
      console.log(data);
      if (data.status === 422 || data.status === 400 || !data) {
        window.alert("invalid credentials");
      } else {
         setProcessing(false);
        setSuccessed(true);
        dispatch({ type: "USER", payload: true });

        
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    TweenMax.from(divRef, 2, { y: 500, duration: 1, ease: Power4.easeOut });
  }, []);
  return (
    <div
      ref={(el) => {
        divRef = el;
      }}
      className="login__extDiv"
    >
      <div className="login__centerDiv">
        <div className="login__leftSide">
          <img src={loginIllustrator} alt="..." />
        </div>
        <div className="login__rightSide">
          <h2>sign in</h2>
          <form method="POST" onSubmit={submitHandler}>
            <div className="login__formField">
              <div className="login__fieldCloser">
                <label>
                  <EmailIcon  />
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={inputHandler}
                  placeholder="Your Email"
                />
              </div>
            </div>
            <div className="login__formField">
              <div className="login__fieldCloser login__password">
                <label>
                  <LockIcon  />
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={user.password}
                  onChange={inputHandler}
                  placeholder="Password"
                />
                {showPassword ? (
                  <VisibilityIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      showPasswordHandle();
                    }}
                  />
                ) : (
                  <VisibilityOffIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      showPasswordHandle();
                    }}
                  />
                )}
              </div>
            </div>
            <div className="login__formField">
              <button type="submit" className="login__submitButton">
                {proccesing?<span>proccesing</span>:successed?<span>successful</span>:<span>Login</span>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
