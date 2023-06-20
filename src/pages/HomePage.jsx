import React from "react";
import { useState } from "react";
import "./HomePage.css";
import hat from "../img/hat.png";
import SignIn from "./SignIn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login, getAuth } from "../components/AcademySlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showModal, setShowModal] = useState(false);

  const closeModal = (e) => {
    setShowModal(e);
  };

  const handleModalSubmit = (e) => {
    toast.success("Successfully Created User!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setShowModal(e);
  };

  const loginHandler = (data) => {
    dispatch(login(data))
      .then((response) => {
        const token = response.payload.token;
        Cookies.set("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        dispatch(getAuth())
          .then((response) => {
            const user = response.payload;
            if (user.role.name === "ADMIN") {
              navigate("/Admin/DashBoard");
            } else {
              navigate("/StudentHomePage");
            }
          })
          .catch((error) => {
            console.log(error);
            // Handle error
          });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("server responded");
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      });
  };

  return (
    <div className="search-params">
      <div className="container">
        <img src={hat} alt="hat" />
        <h1>
          MartinWolak<span>Academy</span>
        </h1>
      </div>
      <form>
        <label htmlFor="username">
          Username
          <input
            type="username"
            name="username"
            placeholder="Enter: username"
            {...register("username", {
              required: true,
            })}
          />
          {errors.username?.type === "required" && (
            <p className="errorMsg">User name is required.</p>
          )}
          {errors.username?.type === "checkLength" && (
            <p className="errorMsg">
              User name should be at-least 6 characters.
            </p>
          )}
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter: password"
            {...register("password", {
              required: true,
              validate: {
                checkLength: (value) => value.length >= 6,
                matchPattern: (value) =>
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                    value
                  ),
              },
            })}
          />
          {errors.password?.type === "required" && (
            <p className="errorMsg">Password is required.</p>
          )}
          {errors.password?.type === "checkLength" && (
            <p className="errorMsg">
              Password should be at-least 6 characters.
            </p>
          )}
          {errors.password?.type === "matchPattern" && (
            <p className="errorMsg">
              Password should contain at least one uppercase letter, lowercase
              letter, digit, and special symbol.
            </p>
          )}
        </label>
        <button onClick={handleSubmit(loginHandler)} className="log-in-button">
          Log In
        </button>
        <button
          className="create-account-button"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
        >
          Create New Account
        </button>
        {showModal ? (
          <SignIn
            handleModalClose={closeModal}
            handleModalSubmit={handleModalSubmit}
          />
        ) : null}
      </form>
      <ToastContainer />
    </div>
  );
};

export default HomePage;
