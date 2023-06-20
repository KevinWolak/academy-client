import HomePage from "../pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import About from "../studentPages/About";
import AdminDashBoard from "../adminPages/AdminDashBoard";
import PrivateRoutes from "../Util/PrivateRoutes";
import AdminRoutes from "../Util/AdminRoutes";
import ErrorPage from "../pages/ErrorPage";
import ClassList from "../adminPages/ClassList";
import Assignment from "../adminPages/Assignment";
import StudentProfileModal from "../adminPages/StudentProfileModal";
import CreateAssessment from "../adminPages/CreateAssessment";
import AssessmentPage from "../adminPages/AssessmentPage";
import ResearchPage from "../studentPages/ResearchPage";
import StudentHomePage from "../studentPages/StudentHomePage";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Error" element={<ErrorPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/StudentHomePage" element={<StudentHomePage />} />
            <Route path="/About" element={<About />} />
            <Route path="/Research" element={<ResearchPage />} />
          </Route>
          <Route element={<AdminRoutes />}>
            <Route path="/Admin/DashBoard" element={<AdminDashBoard />} />
            <Route path="/classList" element={<ClassList />} />
            <Route path="/assigment" element={<Assignment />} />
            <Route path="/CreateAssessment" element={<CreateAssessment />} />
            <Route path="/student-profile" element={<StudentProfileModal />} />

            <Route
              path="/student-profile/:userId"
              element={<StudentProfileModal />}
            />
            <Route
              path="/assessment/:assessmentId"
              element={<AssessmentPage />}
            />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
