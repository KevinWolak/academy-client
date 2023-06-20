import React from "react";
import "./StudentHomePage.css";
import homeImage from "../img/martinWolakAcademy.png";
import ipadStudent from "../img/ipadStudent.png";
import bookPen from "../img/bookPen.png";
import stickynotes from "../img/stickynotes.png";
import laptop from "../img/laptop.png";
import DashBoard from "./DashBoard";

const StudentHomePage = () => {
  return (
    <div className="student-home-wrapper">
      <DashBoard />
      <img src={homeImage} alt="homeImage" className="homeImage" />
      <h2 className="student-home-title">Mission of the Project</h2>
      <p className="student-home-description">
        Making a more significant impact in the field of education
      </p>
      <div className="grid-container">
        <div className="grid-item">
          <img src={ipadStudent} alt="ipadStudent" className="ipadStudent" />
          <div className="grid-item-content">
            <h3 className="grid-item-title">Education at home or on the go</h3>
            <p className="grid-item-description">
              Online learning from the comfort of your home or when you are on
              the go.
            </p>
          </div>
        </div>
        <div className="grid-item">
          <img src={bookPen} alt="bookPen" className="bookPen" />
          <div className="grid-item-content">
            <h3 className="grid-item-title">Evidence-based Practice</h3>
            <p className="grid-item-description">
              I utilize evidence-based pedagogy and the Science of Reading.
            </p>
          </div>
        </div>
        <div className="grid-item">
          <img src={stickynotes} alt="stickynotes" className="stickynotes" />
          <div className="grid-item-content">
            <h3 className="grid-item-title">Class or 1-1 tutoring</h3>
            <p className="grid-item-description">
              Available high-quality small group lessons and 1-1 lessons.
            </p>
          </div>
        </div>
        <div className="grid-item">
          <img src={laptop} alt="laptop" className="laptop" />
          <div className="grid-item-content">
            <h3 className="grid-item-title">
              Available high-quality small group lessons and 1-1 lessons.
            </h3>
            <p className="grid-item-description">
              My goal is to reduce the chasm between pedagogy and research.
            </p>
          </div>
        </div>
      </div>
      <h2 class="question-heading">Question?</h2>
      <p class="question-paragraph">
        Contact{" "}
        <a className="emailLink" href="mailto:martin@wolakacademy.com">
          martin@wolakacademy.com
        </a>{" "}
        to get more information about the services we provide.
      </p>
    </div>
  );
};

export default StudentHomePage;
