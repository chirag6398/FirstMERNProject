import React, { useEffect, useCallback, useRef, useState } from "react";
import "../styles/contact.css";
import { TweenMax, Power4 } from "gsap";

export default function Contact() {
  let divRef = useRef(null);
  const [userData, setUserData] = useState({});

  const inputHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const callAboutPage = useCallback(async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (!data.status === 200) {
        const error = new Error(data.error);
        throw error;
      } else {
        setUserData(data);
      }
    } catch (Err) {
      console.log(Err);
    }
  }, []);
  callAboutPage();

  const messageSubmitHandler = async (e) => {
    e.preventDefault();

    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    console.log(data);
    if (data.status !== 201 || !data) {
      window.alert("message not send");
    } else {
      window.alert("message succesfuly send");
      setUserData({ ...userData, message: "" });
    }
  };

  useEffect(() => {
    TweenMax.from(divRef, 3, {
      opacity: 0,
      duration: 1,
      ease: Power4.easeInOut,
    });
  }, []);

  useEffect(() => {
    TweenMax.from(".conatct__box", 2, {
      opacity: 0,
      duration: 1,
      ease: Power4.easeInOut,
    });
  }, []);
  return (
    <div className="contact__extDiv">
      <div className="contact__content">
        <section className="contact__sample1">
          <div className="conatct__box">
            <h5>Phone</h5>
            <p>+91-6398******</p>
          </div>
          <div className="conatct__box">
            <h5>Email</h5>
            <p>name@gmail.com</p>
          </div>
          <div className="conatct__box">
            <h5>Address</h5>
            <p>Lal Chowk,New Delhi</p>
          </div>
        </section>
        <section
          ref={(el) => {
            divRef = el;
          }}
          className="contact__sample2"
        >
          <div className="contact__userInputFields">
            <div className="contact__input1">
              <input
                type="text"
                name="name"
                onChange={inputHandler}
                value={userData.name}
                placeholder="Your Name"
              />
            </div>
            <div className="contact__input1">
              <input
                type="email"
                name="email"
                onChange={inputHandler}
                value={userData.email}
                placeholder="Your email"
              />
            </div>
            <div className="contact__input1">
              <input
                type="number"
                name="phone"
                onChange={inputHandler}
                value={userData.phone}
                placeholder="Your phone no"
              />
            </div>
          </div>
          <div className="contact__textArea">
            <div className="contact__input2">
              <textarea
                type="text"
                name="message"
                onChange={inputHandler}
                value={userData.message}
                placeholder="message"
              />
            </div>
          </div>
          <div className="contact__button">
            <button type="submit" onClick={messageSubmitHandler}>
              send
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
