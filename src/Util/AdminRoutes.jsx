// import { Navigate, Outlet } from "react-router-dom";
// import Cookies from "js-cookie";
// import axios from "axios";

// const AdminRoutes = () => {
//   const token = Cookies.get("token");

//   axios
//     .get("http://localhost:3000/api/getAuth")
//     .then((response) => {
//       const role = response.data.user.role.name;
//       console.log("Role ", role);

//       if (token && role === "ADMIN") {
//         return <Outlet />;
//       } else {
//         return <Navigate to="/" />;
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//       return <Navigate to="/" />;
//     });

//   return null; // or some loading indicator, since the response is not yet received
// };

// export default AdminRoutes;

import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const AdminRoutes = () => {
  const token = Cookies.get("token");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
      "token"
    )}`;
    axios
      .get("http://localhost:3000/api/getAuth")
      .then((response) => {
        const role = response.data.user.role.name;
        setRole(role);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  } else if (role === "") {
    return <Navigate to="/Error" />;
  } else if (token && role === "ADMIN") {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default AdminRoutes;
