import React from "react";
import bookPen from "../img/bookPen.png";
import "./ResearchPage.css"; // Import the CSS file for styling
import DashBoard from "./DashBoard";

const ResearchPage = () => {
  const handleClick = () => {
    window.open(
      "http://www.ijiet.org/vol13/IJIET-V13N1-1783-ijiet-5718.pdf",
      "_blank"
    );
  };

  return (
    <>
      <DashBoard /> 
      <div className="research-page-container">
        <h1 className="research-page-title">Research Publications</h1>
        <img src={bookPen} alt="bookPen" className="research-page-image" />
        <div className="research-publication">
          <h2 className="research-publication-title">
            <a
              href="#"
              className="research-publication-link"
              onClick={handleClick}
            >
              A Case Study of Virtual Kindergarten Teachers in
              Technology-Enhanced Classrooms
            </a>
            <p className="research-author">Martin Wolak and Mi Song Kim*</p>
          </h2>
          <p className="research-publication-abstract">
            Abstract—With the threat of future global pandemics and the possible
            necessity to mandate schools to transition to temporary online
            learning, it is imperative to provide kindergarten teachers with
            effective pedagogical practices using technological devices and
            resources in virtual classrooms. To address this challenge, this
            case study aims to discover 1) the attitudes and beliefs towards
            digital screen-based technologies or resources in the virtual
            classroom, 2) the benefits and challenges of teaching and learning
            in virtual kindergarten classrooms, 3) the digital screen-based
            technological tools or resources FDK educators are currently
            implementing, 4) how educators used the tools or resources to
            document play-based learning virtually, 5) and what do educators
            need to integrate technology into their virtual pedagogical
            practices effectively. Using semi-structured interviews from 11
            early childhood educators and one teacher-researcher from virtual
            kindergarten classrooms in Ontario, Canada, a thematic content
            analysis from the typed transcripts and reflective notes was adopted
            to generate emerging themes. The findings demonstrated that 1)
            educators had a similar positive attitude towards technology in
            kindergarten as in other countries worldwide, 2) the benefits and
            challenges of virtual teaching and learning, 3) update on what types
            of technological devices and resources educators especially in the
            virtual milieu, are using, 4) and ways to support successful
            technology integration into virtual pedagogical practices. The
            findings from this study, in conjunction with other current
            research, provide practical recommendations for virtual kindergarten
            educators, parents, school boards, and policymakers.
          </p>
          <p className="index">
            Index Terms—Virtual teachers, technology-enhanced classrooms,
            kindergarten, digital screen-based devices.
          </p>
        </div>
      </div>
    </>
  );
};

export default ResearchPage;
