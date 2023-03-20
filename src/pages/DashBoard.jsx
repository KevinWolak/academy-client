import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./DashBoard.css";
const DashBoard = () => {
  return (
    <nav className="nav">
      <ul>
        <CustomLink className="site-title" to="/">
          Home
        </CustomLink>
        <CustomLink to="/about">About me</CustomLink>
        <CustomLink to="/contact"> Contact </CustomLink>
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
