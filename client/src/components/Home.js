import React, {  useState,useContext,useCallback  } from "react";
import "../styles/home.css";
import {UserContext} from "../App";
export default function Home() {
  const [userData, setUserData] = useState({});
const {dispatch} = useContext(UserContext);
  const getData = useCallback(
   async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      
      setUserData(data);
      if (!data.status === 200) {
        const error = new Error(data.error);
        throw error;
      }
      else
      {
        dispatch({type:"USER",payload:true})
      }
    } catch (Err) {
      console.log(Err);
    }
  },
    [dispatch],
  )
  getData();
  
  return (
    <div className="home__extDiv">
      <div className="home__content">
        <p>WELCOME</p>
        {userData.name ? <h2>{userData.name}</h2> : null}
        <h2>We Are The MERN Developers</h2>
      </div>
      <div className="home__leftDiv"></div>
      <div className="home__rightDiv"></div>
    </div>
  );
}
