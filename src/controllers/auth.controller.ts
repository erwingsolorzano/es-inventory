import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Replace with a secure secret in production
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Register a new user
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser: IUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      message: 'User registered successfully',
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration error', error });
  }
};

// Login an existing user
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Verify user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login error', error });
  }
};

// Test route to get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
};
