import HomePage from "../pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "../pages/DashBoard";
import About from "../pages/About";
import Contact from "../pages/Contact";
import AdminDashBoard from "../pages/AdminDashBoard";
import PrivateRoutes from "../Util/PrivateRoutes";
import AdminRoutes from "../Util/AdminRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/DashBoard" element={<DashBoard />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path="/Admin/DashBoard" element={<AdminDashBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
