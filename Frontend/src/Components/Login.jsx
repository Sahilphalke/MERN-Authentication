import React from "react";
import { useState } from "react";
import { handleError, handleSuccess } from "../Util";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Login() {
  const [userlogin, setUserLogIn] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputForm = (e) => {
    setUserLogIn({ ...userlogin, [e.target.name]: e.target.value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    console.log(userlogin);
    setUserLogIn({
      email: "",
      password: "",
    });

    const { email, password } = userlogin;

    if (!email || !password) {
      return handleError("All feild are must required");
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userlogin),
      });
      const result = await response.json();
      const { success, message, error, jwtToken, name } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else if (error) {
        const detail = error?.details[0].message;
        handleError(detail);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      <div>
        <div className="size-lvh w-full flex justify-center items-center">
          <div className=" p-5 w-sm rounded-xl shadow-lg shadow-blue-150">
            <h4 className="font-serif text-3xl mb-5">Sign In</h4>
            <form action="" onSubmit={handleForm}>
              <div className="mb-5">
                <label htmlFor="email" className="text-lg font-sans">
                  Email
                </label>
                <br />
                <input
                  className="w-full border-2 p-2 mt-2 rounded-lg hover:border-green-300 focus:border-green-500 outline-0"
                  type="email"
                  name="email"
                  id="email"
                  value={userlogin.email}
                  onChange={handleInputForm}
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="text-lg font-sans">
                  Password
                </label>
                <br />
                <input
                  className="w-full border-2 p-2 mt-2 rounded-lg hover:border-green-300 focus:border-green-500 outline-0"
                  type="password"
                  name="password"
                  id="password"
                  value={userlogin.password}
                  onChange={handleInputForm}
                  placeholder="Enter your password"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="uppercase w-full p-2 rounded-lg bg-amber-400"
                >
                  Sign In
                </button>
              </div>

              <h1 className="float-end mt-3">
                Don't have account
                <Link to="/signup">
                  <span className="underline ml-3 font-mono animate-bounce text-blue-900">
                    Sign Up
                  </span>
                </Link>
              </h1>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
