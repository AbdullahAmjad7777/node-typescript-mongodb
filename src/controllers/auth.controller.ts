import { Request, Response } from "express";
import userModel, { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { user_name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser: User | null = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword: string = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser: User = new userModel({
      user_name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser: User = await newUser.save();

    return res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Error registering user:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while registering user", error });
  }
};

const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user: User | null = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token: string = jwt.sign(
      { id: user._id },
      process.env.JWT_SEC!,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while logging in", error });
  }
};

export { createUser, loginUser };
