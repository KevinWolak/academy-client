import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { classList } from "../components/AcademySlice";
import "./ClassList.css";

const ClassList = () => {
  const [isAscending, setIsAscending] = useState(true);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.academySlice.users);

  useEffect(() => {
    dispatch(classList())
      .then(() => {
        console.log("Class list fetched successfully!");
      })
      .catch((error) => {
        console.error("Failed to fetch class list:", error);
      });
  }, []);

  //Sort Function is not Working Properly. Data Disappersz`
  const sortUsers = () => {
    const sortedUsers = [...users.data].sort((a, b) =>
      isAscending
        ? a.lastName.localeCompare(b.lastName)
        : b.lastName.localeCompare(a.lastName)
    );
    dispatch({ type: "academy/classList/fulfilled", payload: sortedUsers });
    setIsAscending(!isAscending);
  };

  return (
    <div>
      <h2 className="classList">ClassList</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th onClick={sortUsers}>Last Name {isAscending ? "▲" : "▼"}</th>
            <th>Date of Birth</th>
            <th>Phone Number</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users.data) &&
            users.data.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>
                  <Link
                    to={`/student-profile/${user.id}`} // Use userId as a URL parameter
                    state={{ userId: user.id }}
                  >
                    {user.lastName}
                  </Link>
                </td>
                <td>{user.dateOfBirth}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.username}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassList;
