import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;

   if ([name, email, password].some((feild) => feild?.trim === "")) {
      throw new ApiError(400, "All fields are required");
   }

   const existedUser = await User.findOne({ email: email });

   if (existedUser) {
      throw new ApiError(400, "User already exist");
   }

   const user = await User.create({ name, email, password });
   const createdUser = await User.findById(user._id).select("-password");

   if (!createdUser) {
      throw new ApiError(500, "Something went wrong");
   }
   res.status(201).json(
      new ApiResponse(200, createdUser, "User created successfully")
   );
});

const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      throw new ApiError(400, "All fields are required");
   }

   const user = await User.findOne({ email: email });
   if (!user) {
      throw new ApiError(400, "User not found");
   }

   const isPasswordCorrect = await user.isPasswordCorrect(password);

   if (!isPasswordCorrect) {
      throw new ApiError(400, "Invalid credentials");
   }

   const accessToken = await user.generateAccessToken();
   if (!accessToken) {
      throw new ApiError(500, "Something went wrong");
   }

   const loggedInUser = await User.findById(user._id).select("-password");

   const options = {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      secure: true,
   };
   res.cookie("accessToken", accessToken, options);

   res.status(200).json(
      new ApiResponse(
         200,
         {
            user: loggedInUser,
            accessToken,
         },
         "User logged in successfully"
      )
   );
});

export { registerUser, loginUser };
