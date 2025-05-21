import React, { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../Util";
import { useNavigate } from "react-router-dom";
function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [product, setProduct] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("LogOut Successfully");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  // const featchProduct = async () => {
  //   try {
  //     const url = "http://localhost:8080/product";
  //     const response = await fetch(url, {
  //       headers: {
  //         Authorization: localStorage.getItem("token"),
  //       },
  //     });
  //     const result = await response.json();
  //     setProduct(result);
  //     console.log(result);
  //   } catch (err) {}
  // };

  // useEffect(() => {
  //   featchProduct();
  // }, []);
  return (
    <>
      <div>
        <div className="size-lvh w-full flex justify-center items-center font-mono text-xl text-gray-800 capitalize">
          <div className=" p-2 rounded-4xl w-xs text-center flex justify-evenly bg-gray-800">
            <h1 className="text-white">{loggedInUser}</h1>
            <button
              onClick={handleLogout}
              className="text-white hover:text-red-500"
            >
              <LogOut />
            </button>
          </div>
          {/* {product.map((item) => (
            <li>
              <ul>
                {item.name} : {item.price}
              </ul>
            </li>
          ))} */}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Home;
