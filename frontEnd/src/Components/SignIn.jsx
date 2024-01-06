import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import axios from "axios";
export function SignIn() {
   const [signUpData, setSignUpData] = useState({
      email: "",
      password: "",
      name: "",
   });
   const storeToken = Cookies.get("accessToken");

   useEffect(() => {
      if (storeToken) {
         alert("You are already logged in");
         navigate("/");
      }
   });
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const res = await axios.post(
            "http://localhost:8080/api/v1/users/register",
            signUpData
         );

         if (res.data.statusCode === 200) {
            navigate("/login");
            alert("Registerted successfully");
         }
      } catch (error) {
         console.log("Error registering user", error);
         alert("Error registering user");
      }
   };

   const handleChange = (e) => {
      setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
   };

   return (
      <section>
         <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
               <div className="mb-2 flex justify-center"></div>
               <h2 className="text-center text-2xl font-bold leading-tight text-black">
                  Sign up
               </h2>

               <form action="#" method="POST" className="mt-8">
                  <div className="space-y-5">
                     <div>
                        <div className="flex items-center justify-between">
                           <label
                              htmlFor=""
                              className="text-base font-medium text-gray-900"
                           >
                              {" "}
                              Name{" "}
                           </label>
                        </div>
                        <div className="mt-2">
                           <input
                              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              type="text"
                              name="name"
                              value={signUpData.name}
                              placeholder="Enter your Name"
                              onChange={handleChange}
                           ></input>
                        </div>
                     </div>
                     <div>
                        <label
                           htmlFor=""
                           className="text-base font-medium text-gray-900"
                        >
                           {" "}
                           Email address{" "}
                        </label>
                        <div className="mt-2">
                           <input
                              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              type="email"
                              name="email"
                              value={signUpData.email}
                              placeholder="Email"
                              onChange={handleChange}
                           ></input>
                        </div>
                     </div>
                     <div>
                        <div className="flex items-center justify-between">
                           <label
                              htmlFor=""
                              className="text-base font-medium text-gray-900"
                           >
                              {" "}
                              Password{" "}
                           </label>
                        </div>
                        <div className="mt-2">
                           <input
                              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              type="password"
                              name="password"
                              value={signUpData.password}
                              placeholder="Password"
                              onChange={handleChange}
                           ></input>
                        </div>
                     </div>
                     <div>
                        <button
                           type="button"
                           className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                           onClick={handleSubmit}
                        >
                           Sign Up
                        </button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
         <p className="mt-2 text-center text-base text-gray-600">
            Already have an account?{" "}
            <Link
               to="/login"
               title=""
               className="font-medium text-black transition-all duration-200 hover:underline"
            >
               Sign In
            </Link>
         </p>
      </section>
   );
}
