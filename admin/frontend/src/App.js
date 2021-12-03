import React, { useState, useEffect } from "react";
import { authCheck } from "./services/FirebaseConfig";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";

// Admin Panel
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Lessons from "./pages/admin/Lessons";
import Quiz from "./pages/admin/Quiz";
import Logs from "./pages/admin/Logs";
import Admin from "./pages/admin/Admin";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EditProfile from "./pages/EditProfile";

var CryptoJS = require("crypto-js");

function App() {
  const initialState = {
    user: null,
    level: "guest",
  };
  const [session, setSession] = useState(initialState);

  // eslint-disable-next-line
  useEffect(async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      if (session !== initialState) {
        return;
      }
      var bytes = CryptoJS.AES.decrypt(token, "raningu@7712219");
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setSession(decryptedData);
    } else {
      sessionStorage.removeItem("token");
      await authCheck();
    }
  }, []);

  return (
    <div className="app-container">
      <Navbar session={session} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="docs"></Route>
        <Route
          path="signin"
          element={
            !session.user ? <SignIn session={session} /> : <Navigate to="/" />
          }
        ></Route>
        <Route
          path="signup"
          element={
            !session.user ? <SignUp session={session} /> : <Navigate to="/" />
          }
        ></Route>
        <Route
          path="edit_profile"
          element={
            session.user ? (
              <EditProfile session={session} />
            ) : (
              <Navigate to="/" />
            )
          }
        ></Route>
        <Route
          path="dashboard"
          element={
            session.user ? <Dashboard session={session} /> : <Navigate to="/" />
          }
        >
          <Route path="users" element={<Users session={session} />} />
          <Route path="lessons" element={<Lessons session={session} />} />
          <Route path="quiz" element={<Quiz session={session} />} />
          <Route path="admin" element={<Admin session={session} />} />
          <Route path="logs" element={<Logs session={session} />} />
          <Route path="" element={<Navigate to="users" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
