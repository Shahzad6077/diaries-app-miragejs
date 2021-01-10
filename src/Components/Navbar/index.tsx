import React, { FC, Fragment } from "react";
import { NavLink } from "react-router-dom";
import "../index.css";

type NavbarProps = {
  isAuthenticated: boolean;
  onLogout: () => void;
};

const NavBar: FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  return (
    <nav>
      <h1>Diary App</h1>
      <ul>
        {isAuthenticated ? (
          <Fragment>
            <li>
              <NavLink end to="/">
                Diaries
              </NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={onLogout}>
                Logout
              </NavLink>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">signup</NavLink>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
