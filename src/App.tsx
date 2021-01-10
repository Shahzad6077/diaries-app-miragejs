import React, { Fragment, useEffect, useState } from "react";
import { Routes, Route, useNavigate, Router } from "react-router-dom";
import { Navbar, EntrySide } from "./Components";
import { HomeView, LoginView, SignupView } from "./Views";
import { AuthState } from "./Types/store";
import { useAppDispatch } from "./Store/store";
import { RootState } from "./Store/rootReducer";
import { useSelector } from "react-redux";
import { logout, onAuthSet } from "./Store/Slices/auth";
import Test from "./Test";

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authReducerState = useSelector((state: RootState) => state.authReducer);
  useEffect(() => {
    (async () => {
      try {
        const jsonRes = await fetch("/api/authentication");
        const res = await jsonRes.json();
        if (res.isAuthenticated) {
          dispatch(onAuthSet(res));
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  useEffect(() => {
    if (authReducerState?.isAuthenticated) {
      console.log("if part");
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [authReducerState]);

  const onLogout = async () => {
    try {
      const jsonRes = await fetch("/api/logout");
      const res = await jsonRes.json();
      if (res.success) {
        dispatch(logout());
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <Test />
      <Navbar onLogout={onLogout} />
      <main>
        <Routes>
          <Route path="/" element={<HomeView />}>
            <Route path="entry/:diaryId" element={<EntrySide />} />
          </Route>

          <Route path="login" element={<LoginView />} />
          <Route path="signup" element={<SignupView />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
