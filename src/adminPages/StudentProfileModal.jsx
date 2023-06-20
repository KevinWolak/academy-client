import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserData, fetchUserAnswers } from "../components/AcademySlice";
import "./StudentProfileModal.css";

const StudentProfileModal = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResponse = await dispatch(fetchUserData(userId));
        const userAnswersResponse = await dispatch(fetchUserAnswers(userId));

        const user = userDataResponse.payload;
        const userAnswers = userAnswersResponse.payload;

        console.log("UserOne", user);
        console.log("UserTwo", userAnswers);

        if (user) {
          const updatedUserData = { ...user, answer: userAnswers };
          setUserData(updatedUserData);
        } else {
          console.log(`User with ID ${userId} not found.`);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch, userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { id, firstName, lastName, username, dateOfBirth, phoneNumber } =
    userData;

  const trueCount = userData.answer.filter(
    (answer) => answer.answer.answer
  ).length;

  const falseCount = userData.answer.filter(
    (answer) => !answer.answer.answer
  ).length;

  return (
    <div className="student-profile">
      <h2>Student Profile</h2>
      <div className="profile-info">
        <div>
          <strong>Id:</strong> {id}
        </div>
        <div>
          <strong>First Name:</strong> {firstName}
        </div>
        <div>
          <strong>Last Name:</strong> {lastName}
        </div>
        <div>
          <strong>Username:</strong> {username}
        </div>
        <div>
          <strong>Birthday:</strong> {dateOfBirth}
        </div>
        <div>
          <strong>Phone Number:</strong> {phoneNumber}
        </div>
        <div>
          <strong>Correct Answers:</strong> {trueCount}
        </div>
        <div>
          <strong>Incorrect Answers:</strong> {falseCount}
        </div>
      </div>
    </div>
  );
};

export default StudentProfileModal;
