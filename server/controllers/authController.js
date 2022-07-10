import User from "../model/User.js";
import { StatusCodes } from "http-status-codes";
const register = async (req, res, next) => {
  const user = await User.create(req.body);
  return res.status(StatusCodes.CREATED).json({ user });
};
const login = async (req, res) => {
  res.send("login");
};
const updateUser = async (req, res) => {
  res.send("updateUser");
};
export { register, login, updateUser };