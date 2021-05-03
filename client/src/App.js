import React, { createContext, useReducer } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Routes from "./Routes/Routes";
import { BrowserRouter } from "react-router-dom";
import { initialState, reducer } from "./reducer/Reducer";

export const UserContext = createContext();
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ state, dispatch }}>
        <div className="app">
          <Nav />
          <Routes />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
