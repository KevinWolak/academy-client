import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAssessments, deleteAssessment } from "../components/AcademySlice";
import "./Assignment.css";

const Assignment = () => {
  const [assessments, setAssessment] = useState([]);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const CreateAssessmentHandler = () => {
    navigate("/CreateAssessment");
  };

  const DeleteAssessmentHandler = (assessmentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this assessment?"
    );
    if (confirmed) {
      dispatch(deleteAssessment(assessmentId))
        .unwrap()
        .then(() => {
          setAssessment((prevAssessments) =>
            prevAssessments.filter(
              (assessment) => assessment.id !== assessmentId
            )
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    dispatch(fetchAssessments())
      .unwrap()
      .then((assessments) => {
        setAssessment(assessments);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch]);

  return (
    <div className="links-container">
      <h1 className="dashboard-title">Assessments</h1>
      <div>
        {assessments.map((assessment) => (
          <div key={assessment.id}>
            <h2 className="assignment-link">
              <Link
                to={`/assessment/${assessment.id}`}
                state={{ assessmentId: assessment.id }}
              >
                {assessment.name}
              </Link>
            </h2>
            <button
              onClick={() => DeleteAssessmentHandler(assessment.id)}
              className="delete-assessment-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <button onClick={CreateAssessmentHandler} className="assessment-btn">
        Create an Assessment
      </button>
    </div>
  );
};

export default Assignment;
