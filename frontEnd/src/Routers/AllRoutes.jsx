import { Route, Routes } from "react-router-dom";
import { SignIn } from "../Components/SignIn";
import { Login } from "../Components/Login";

export const AllRoutes = () => {
   return (
      <Routes>
         <Route path="signin" element={<SignIn />} />
         <Route path="login" element={<Login />} />
         
      </Routes>
   );
};
