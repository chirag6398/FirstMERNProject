import React, { useEffect, useCallback, useState } from "react";
import "../styles/about.css";
import { useHistory } from "react-router-dom";
import { Avatar } from "@material-ui/core";
export default function About() {
  const [seed, setSeed] = useState("");
  const [userData, setUserData] = useState({});
  const history = useHistory();

  const callAboutPage = useCallback(async () => {
    try {
      const res = await fetch("/api/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();

      setUserData(data);
      if (!data.status === 200 || !data) {
        const error = new Error(data.error);
        throw error;
      }
    } catch (Err) {
      console.log(Err);
      history.push("/login");
    }
  }, [history]);
  callAboutPage();

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div
          style={{
            minWidth: "500px",
            height: "auto",
            border: "1px solid black",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "#f25f4c",
            padding: "20px 0px",
            borderRadius: "3px",
            color: "white",
            boxShadow: "-3px 4px 9px -6px rgb(0,0,0.1)",
          }}
        >
          <Avatar
            src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
            style={{
              height: "150px",
              objectFit: "contain",
              width: "250px",
            }}
          />
          <h2>Name : {userData.name}</h2>
          <p>Email : {userData.email}</p>
          <p>Work : {userData.work}</p>
          <p>Phone : {userData.phone}</p>
        </div>
      </div>
    </>
  );
}

// import "aos";
// import "aos/dist/aos.css";
// import Aos from "aos";
// import starImg from "../images/starstar.svg";
// export default function About() {
//   useEffect(() => {
//     Aos.init({ duration: 1000 });
//   }, []);
//   return (
//     <div className="contact__extDiv">
//       <div className="contact__backgroungAnimation1">
//         <img src={starImg} alt=".." />
//       </div>
//       <div className="contact__backgroungAnimation2">
//         <img src={starImg} alt=".." />
//       </div>
//       <div className="contact__backgroungAnimation3">
//         <img src={starImg} alt=".." />
//       </div>
//       <div className="contact__backgroungAnimation4">
//         <img src={starImg} alt=".." />
//       </div>
//       <div className="contact__backgroungAnimation5">
//         <img src={starImg} alt=".." />
//       </div>
//       <div className="contact__backgroungAnimation6">
//         <img src={starImg} alt=".." />
//       </div>
//       <div className="contact__backgroungAnimation7">
//         <img src={starImg} alt=".." />
//       </div>
//       <div className="contact__backgroungAnimation8">
//         <img src={starImg} alt=".." />
//       </div>
//       <div className="contact__backgroungAnimation9">
//         <img src={starImg} alt=".." />
//       </div>
//       <div className="contact__backgroungAnimation10">
//         <img src={starImg} alt=".." />
//       </div>
//       <div className="container">
//         <div data-aos="fade-right" className="boxes"></div>
//         <div data-aos="slide-right" className="boxes"></div>
//         <div data-aos="slide-left" className="boxes"></div>
//         <div data-aos="fade-right" className="boxes"></div>
//         <div data-aos="zoom-in-left" className="boxes"></div>
//         <div data-aos="fade-up" className="boxes"></div>
//         <div data-aos="fade-left" className="boxes"></div>
//         <div data-aos="slide-left" className="boxes"></div>
//       </div>
//     </div>
//   );
// }
