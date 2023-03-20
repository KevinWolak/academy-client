import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
const PrivateRoutes = () => {
  console.log("HELLO");
  const token = Cookies.get("token");
  console.log("TOKEN", token);
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
