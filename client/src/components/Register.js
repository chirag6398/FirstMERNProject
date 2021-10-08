import React, { useState, useEffect, useRef } from "react";
import "../styles/register.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockIcon from "@material-ui/icons/Lock";
import BusinessIcon from "@material-ui/icons/Business";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import illustration from "../images/completeImgillustration.svg";
import { TweenMax, Power3 } from "gsap";
import { useHistory } from "react-router-dom";
export default function Register() {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });
  const [proccesing,setProcessing]=useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  let divRef = useRef(null);

  const showConfirmPasswordHandle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const showPasswordHandle = () => {
    setShowPassword(!showPassword);
  };

  const inputHandle = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setProcessing(true);
      const { name, email, phone, work, password, cpassword } = user;

      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, email, work, password, cpassword, phone }),
      });

      const data = await res.json();

      if (data.status === 422 || !data) {
        setProcessing(false);
        window.alert("unsuccesssful regis...");
      } else {
        window.alert("successful registration");
        history.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    TweenMax.from(divRef, 1.4, {
      x: 500,
      y: -500,
      opacity: 0,
      duration: 2,
      ease: Power3.out,
    });
  }, []);

  return (
    <div
      className="register__outsideContainer"
      ref={(el) => {
        divRef = el;
      }}
    >
      <div className="register__centerDiv">
        <div className="register__formContent">
          <h2 className="register__heading">Sign up</h2>
          <form method="POST" onSubmit={submitHandler}>
            <div className="register__formField">
              <div className="register__fieldCloser">
                <label>
                  <AccountCircleIcon />
                </label>
                <input
                  type="text"
                  onChange={inputHandle}
                  value={user.name}
                  name="name"
                  placeholder="Your Name"
                />
              </div>
            </div>
            <div className="register__formField">
              <div className="register__fieldCloser">
                <label>
                  <EmailIcon />
                </label>
                <input
                  type="email"
                  onChange={inputHandle}
                  value={user.email}
                  name="email"
                  placeholder="Your Email"
                />
              </div>
            </div>
            <div className="register__formField">
              <div className="register__fieldCloser">
                <label>
                  <BusinessIcon />
                </label>
                <input
                  type="text"
                  onChange={inputHandle}
                  value={user.work}
                  name="work"
                  placeholder="Your Profession"
                />
              </div>
            </div>
            <div className="register__formField">
              <div className="register__fieldCloser">
                <label>
                  <PhoneIcon />
                </label>
                <input
                  type="text"
                  onChange={inputHandle}
                  value={user.phone}
                  name="phone"
                  placeholder="Phone No"
                />
              </div>
            </div>
            <div className="register__formField">
              <div className="register__fieldCloser register__password">
                <label>
                  <LockIcon />
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={inputHandle}
                  value={user.password}
                  name="password"
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
            <div className="register__formField">
              <div className="register__fieldCloser register__password">
                <label>
                  <VpnKeyIcon />
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={inputHandle}
                  value={user.cpassword}
                  name="cpassword"
                  placeholder="Confirm Password"
                />
                {showConfirmPassword ? (
                  <VisibilityIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      showConfirmPasswordHandle();
                    }}
                  />
                ) : (
                  <VisibilityOffIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      showConfirmPasswordHandle();
                    }}
                  />
                )}
              </div>
            </div>
            <div className="register__formField">
              <button type="submit" className="register__submitButton">
              {proccesing?<span>proccesing</span>:<span>Register</span>}
              </button>
            </div>
          </form>
        </div>
        <div className="register__illustration">
          <img src={illustration} alt="..." />
        </div>
      </div>
    </div>
  );
}
