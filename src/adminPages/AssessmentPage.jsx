import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  classList,
  submitQuestionAnswers,
  fetchAssessmentData,
} from "../components/AcademySlice";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import "./AssessmentPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssessmentPage = () => {
  const { assessmentId } = useParams();
  const [selectedUserId, setSelectedUserId] = useState("");
  const [assessmentData, setAssessmentData] = useState(null);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.academySlice.users);

  useEffect(() => {
    dispatch(classList());
  }, [dispatch]);

  useEffect(() => {
    const fetchAssessmentData = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
          "token"
        )}`;
        const response = await axios.get(
          `http://localhost:3000/api/assessment/${assessmentId}`
        );
        const assessment = response.data.data;
        if (assessment) {
          setAssessmentData(assessment);
        } else {
          console.log(`Assessment with ID ${assessmentId} not found.`);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAssessmentData();
  }, [assessmentId]);

  if (!assessmentData) {
    return <div>Loading...</div>;
  }

  const { name, description, modules } = assessmentData;
  console.log("assessmentData", assessmentData);

  const handleUserChange = (event) => {
    setSelectedUserId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const answers = modules.flatMap((module) => {
      return module.questions.map((question) => {
        const answer = document.querySelector(
          `input[name=answer-${question.id}]:checked`
        )?.value;
        const isCorrect = answer === "correct";
        return { questionId: question.id, answer: isCorrect };
      });
    });

    dispatch(submitQuestionAnswers({ answers, selectedUserId }))
      .then((response) => {
        console.log(response);
        toast.success("Data submitted successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="assessment-page-container">
      <h1 className="assessment-page-title">{name}</h1>
      <div className="assessment-page-description">{description}</div>
      <form onSubmit={handleSubmit}>
        <div className="user-select">
          <label htmlFor="user-dropdown">Select user:</label>
          <select
            name="user-dropdown"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            {Array.isArray(users.data) &&
              users.data.map((user) => (
                <option key={user.id} value={user.id}>
                  {`${user.username} (${user.firstName} ${user.lastName})`}
                </option>
              ))}
          </select>
        </div>
        <div className="assessment-page-content">
          {modules.map((module) => (
            <div key={module.id}>
              <h2 className="module-name">{module.name}</h2>
              {module.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="assessment-page-question-item"
                >
                  <p className="assessment-page-question-text">{`${
                    index + 1
                  }. ${question.question}`}</p>
                  <div className="assessment-page-question-options">
                    <label htmlFor={`correct-${question.id}`}>
                      <input
                        className="assessment-page-question-radio"
                        type="radio"
                        id={`correct-${question.id}`}
                        name={`answer-${question.id}`}
                        value="correct"
                      />
                      Correct
                    </label>
                    <label htmlFor={`incorrect-${question.id}`}>
                      <input
                        className="assessment-page-question-radio"
                        type="radio"
                        id={`incorrect-${question.id}`}
                        name={`answer-${question.id}`}
                        value="incorrect"
                      />
                      Incorrect
                    </label>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <button className="assessment-page-btn-submit" type="submit">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AssessmentPage;
