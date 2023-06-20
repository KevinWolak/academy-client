import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./DashBoard.css";
import StudentHomePage from "./StudentHomePage";
import leaf from "../img/leaf.png";
const DashBoard = () => {
  return (
    <nav className="nav">
      <ul>
        <CustomLink className="site-title" to="/StudentHomePage">
          <img src={leaf} alt="leaf" className="leaf" /> Wolak Academy
        </CustomLink>
        <CustomLink to="/about">About</CustomLink>
        <CustomLink to="/Research">Research</CustomLink>
      </ul>
    </nav>
  );
};

export default DashBoard;

const CustomLink = ({ to, children, ...props }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
};
