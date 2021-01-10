import React, { Fragment, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Navbar, EntrySide } from "./Components";
import { HomeView, LoginView, SignupView } from "./Views";
import { AuthState } from "./Types/store";

function App() {
  const navigate = useNavigate();
  const [authenticatedObj, setAuthenticated] = useState<AuthState | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const jsonRes = await fetch("/api/authentication");
        const res = await jsonRes.json();
        if (res.isAuthenticated) {
          onSetAuth(res);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  useEffect(() => {
    console.log(authenticatedObj?.isAuthenticated, "<--");
    if (authenticatedObj?.isAuthenticated) {
      console.log("if part");
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [authenticatedObj]);

  const onLogout = async () => {
    try {
      const jsonRes = await fetch("/api/logout");
      const res = await jsonRes.json();
      if (res.success) {
        setAuthenticated(null);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onSetAuth = (res: AuthState) => {
    console.log(res);
    setAuthenticated(res);
  };
  return (
    <div className="App">
      <Navbar
        onLogout={onLogout}
        isAuthenticated={!!authenticatedObj?.isAuthenticated}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomeView isAuthenticated={!!authenticatedObj?.isAuthenticated} />
            }
          >
            <Route path="entry/:diaryId" element={<EntrySide />} />
          </Route>

          <Route path="login" element={<LoginView onSetAuth={onSetAuth} />} />
          <Route path="signup" element={<SignupView onSetAuth={onSetAuth} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
