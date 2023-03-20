import React from "react";
import { useState } from "react";
import "./HomePage.css";
import hat from "../img/hat.png";
import SignIn from "./SignIn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const HomePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showModal, setShowModal] = useState(false);
  let navigate = useNavigate();

  const closeModal = (e) => {
    setShowModal(e);
  };

  const handleModalSubmit = (e) => {
    toast.success("Succefully Created User!", {
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
    console.log("data", data);
    axios
      .post("http://localhost:3000/signin", data)
      .then((response) => {
        console.log(response.data.token);
        Cookies.set("token", response.data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
          "token"
        )}`;
        axios
          .get("http://localhost:3000/api/getAuth", data)
          .then((response) => {
            console.log(response);
            if (response.data.user.role.name === "ADMIN") {
              navigate("/Admin/DashBoard");
            } else {
              navigate("/DashBoard");
            }
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
            placeholder="username"
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
            placeholder="password"
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
