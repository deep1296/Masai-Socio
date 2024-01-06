import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Login({ setIsAuthenticated }) {
   const navigate = useNavigate();

   const [formData, setFormData] = useState({
      email: "",
      password: "",
   });
   const storeToken = Cookies.get("accessToken");
   const [accessToken, setAccessToken] = useState(storeToken || null);

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   useEffect(() => {
      if (accessToken) {
         setIsAuthenticated(true);
         navigate("/cart");
      }
   });

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const res = await axios.post(
            "https://odd-elk-baseball-cap.cyclic.app/api/v1/users/login",
            formData
         );

         if (res.status === 200) {
            setAccessToken(res.data.data.accessToken);
            setIsAuthenticated(true);
            alert("Login successful");
            navigate("/cart");

            Cookies.set("accessToken", res.data.data.accessToken, {
               expires: 1,
            });
         }
      } catch (error) {
         console.log("Error registering user", error.res);
         alert("Error logging user");
      }
   };

   return (
      <section>
         <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
               <h2 className="text-center text-2xl font-bold leading-tight text-black">
                  Log in to your account
               </h2>
               <p className="mt-2 text-center text-sm text-gray-600 ">
                  Don&apos;t have an account?{" "}
                  <Link
                     to="/signin"
                     title=""
                     className="font-semibold text-black transition-all duration-200 hover:underline"
                  >
                     Create a free account
                  </Link>
               </p>
               <form
                  action="#"
                  method="POST"
                  className="mt-8"
                  onSubmit={handleSubmit}
               >
                  <div className="space-y-5">
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
                              placeholder="Email"
                              value={formData.email}
                              name="email"
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
                              placeholder="Password"
                              value={formData.password}
                              name="password"
                              onChange={handleChange}
                           ></input>
                        </div>
                     </div>
                     <div>
                        <button
                           type="submit"
                           className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                        >
                           Login
                        </button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </section>
   );
}
