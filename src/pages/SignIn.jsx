import "./SignIn.css";
import { useForm } from "react-hook-form";
import Modal from "../Modal/modal";
import { useDispatch } from "react-redux";
import { createUser } from "../components/AcademySlice";

const SignIn = (props) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createUser(data))
      .then(() => {
        console.log("User created successfully");
        props.handleModalSubmit(false);
      })
      .catch((error) => {
        console.log("Error creating user:", error.message);
      });
  };

  return (
    <>
      <Modal>
        <h1 className="title">Sign Up</h1>
        <section className="app">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="firstName">
              First Name:
              <input
                type="text"
                name="firstName"
                {...register("firstName", {
                  required: true,
                })}
              />
              {errors.firstName?.type === "required" && (
                <p className="errorMsg">First name is required.</p>
              )}
            </label>

            <label htmlFor="lastName">
              Last Name:
              <input
                type="text"
                name="lastName"
                {...register("lastName", {
                  required: true,
                })}
              />
              {errors.lastName?.type === "required" && (
                <p className="errorMsg">Last name is required.</p>
              )}
            </label>
            <label htmlFor="dateOfBirth">
              Birthday:
              <input
                type="text"
                name="dateOfBirth"
                {...register("dateOfBirth", {
                  required: true,
                })}
              />
              {errors.dateOfBirth?.type === "required" && (
                <p className="errorMsg">Date of birth is required.</p>
              )}
            </label>
            <label htmlFor="phoneNumber">
              Phone Number:
              <input
                type="text"
                name="phoneNumber"
                {...register("phoneNumber", {
                  required: true,
                })}
              />
              {errors.phoneNumber?.type === "required" && (
                <p className="errorMsg">Phone number is required.</p>
              )}
            </label>
            <label htmlFor="username">
              username:
              <input
                type="text"
                name="username"
                {...register("username", {
                  required: true,
                  minLength: 6,
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
              Password:
              <input
                type="password"
                name="password"
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
                  Password should contain at least one uppercase letter,
                  lowercase letter, digit, and special symbol.
                </p>
              )}
            </label>
            <button>Submit</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                props.handleModalClose(false);
                console.log("Tiggered");
              }}
            >
              Close
            </button>
          </form>
        </section>
      </Modal>
    </>
  );
};

export default SignIn;
