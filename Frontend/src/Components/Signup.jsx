import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./Login";
import { useState } from "react";
import { handleError, handleSuccess } from "../Util";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleInputForm = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    console.log(user);
    setUser({
      name: "",
      email: "",
      password: "",
    });

    const { name, email, password } = user;

    if (!name || !email || !password) {
      return handleError("All feild are must required");
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
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
            <h4 className="font-serif text-3xl mb-5">Sign Up</h4>
            <form action="" onSubmit={handleForm}>
              <div className="mb-5">
                <label htmlFor="name" className="text-lg font-sans">
                  Name
                </label>
                <br />
                <input
                  className="w-full border-2 p-2 mt-2 rounded-lg hover:border-green-300 focus:border-green-500 outline-0"
                  type="text"
                  name="name"
                  id="name"
                  value={user.name}
                  onChange={handleInputForm}
                  placeholder="Enter your name"
                />
              </div>
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
                  value={user.email}
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
                  value={user.password}
                  onChange={handleInputForm}
                  placeholder="Enter your password"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="uppercase w-full p-2 rounded-lg bg-amber-400"
                >
                  Sign Up
                </button>
              </div>

              <h1 className="float-end mt-3">
                Already have account
                <Link to="/login">
                  <span className="underline ml-3 font-mono animate-bounce text-blue-900">
                    Sign In
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

export default Signup;
