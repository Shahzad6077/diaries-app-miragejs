import React, { FC, useState } from "react";
import dayjs from "dayjs";
import { AuthState } from "./../../Types/store";
import { Link } from "react-router-dom";
type Props = {
  onSetAuth: (res: AuthState) => void;
};

const SignupComp: FC<Props> = ({ onSetAuth }) => {
  const [state, setObjState] = useState({
    email: "",
    password: "",
    error: null,
  });
  const setState = (obj: object) => setObjState((p) => ({ ...p, ...obj }));

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setState({ [name]: value, error: null });
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/api/signup", {
      method: "POST",

      body: JSON.stringify({
        user: {
          email: state.email,
          password: state.password,
          createdAt: new Date().getTime(),
        },
      }),
    })
      .then((s) => s.json())
      .then((res) => {
        if (res.token) {
          onSetAuth({ ...res, isAuthenticated: true });
        }
      })
      .catch((e) => {
        // setError("Your Reminder wasn't saved. Try again.");
        console.error(e);
      });
  };
  return (
    <div className="session">
      <h3>Signup</h3>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          value={state.email}
          onChange={changeHandler}
          placeholder="Enter Email"
        />
        <input
          name="password"
          type="password"
          value={state.password}
          onChange={changeHandler}
          placeholder="Enter Password"
        />
        <button type="submit">register</button>

        <Link to="/login">Have already account? login</Link>
      </form>
      {!!state.error && <p style={{ color: "red" }}>{state.error}</p>}
    </div>
  );
};

export default SignupComp;
