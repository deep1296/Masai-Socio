import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRoles } from "../constants.js";

const userSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
         trim: true,
      },

      email: {
         type: String,
         required: true,
         unique: true,
         trim: true,
      },
      role: {
         type: String,
         enum: Object.values(UserRoles),
         default: UserRoles.USER,
      },
      password: {
         type: String,
         required: [true, "Password is required"],
      },
   },
   { timestamps: true }
);

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();

   this.password = await bcrypt.hash(this.password, 10);
   next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
   return jwt.sign(
      {
         _id: this._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
         expiresIn: "1d",
      }
   );
};

const User = model("User", userSchema);

export default User;
