import { Route, Routes } from "react-router-dom";
import { SignIn } from "../Components/SignIn";
import { Login } from "../Components/Login";
import { Products } from "../Components/Products";
import { Cart } from "../Components/Cart";
import { PrivateRoute } from "./PrivateRoute";
import { useState } from "react";

export const AllRoutes = () => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   return (
      <Routes>
         <Route path="/" element={<Products />} />
         <Route path="signin" element={<SignIn />} />
         <Route
            path="login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
         />
         <Route path="/product" element={<Products />} />
         <Route path="*" element={<SignIn />} />
         <Route
            path="cart"
            element={
               <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Cart />
               </PrivateRoute>
            }
         />
      </Routes>
   );
};
