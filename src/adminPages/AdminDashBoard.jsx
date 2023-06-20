import { useState, useRef } from "react";
import "./AdminDashBoard.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

const AdminDashBoard = () => {
  return (
    <div>
      <nav className="admin-nav">
        <ul>
          <CustomLink className="admin-site-title" to="/classList">
            Class List
          </CustomLink>
          <CustomLink to="/assigment">Assignments</CustomLink>
          <CustomLink to="/Info"> Info </CustomLink>
        </ul>
      </nav>
      <h2 className="admin-header">Admin Page</h2>
    </div>
  );
};

export default AdminDashBoard;

const CustomLink = ({ to, children, ...props }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "admin-active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
};
