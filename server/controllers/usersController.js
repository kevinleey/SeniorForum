import User from "../models/User.js";

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  return res.status(200).json(allUsers);
};

const getUserById = async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  return res.status(200).json(user);
};

const getProfile = async (req, res) => {
  try {
    let auth0Id = req.params.userID;
    //console.log("GETPROFILE AUHTID: ", auth0Id);
    auth0Id = auth0Id.replace("auth0|", "");
    const user = await User.findById(auth0Id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editProfile = async (req, res) => {
  let auth0UserId = req.params.userID;
  auth0UserId = auth0UserId.replace("auth0|", "");
  const user = await User.findById(auth0UserId);
  if (!user) {
    return res.status(404).send("User not found");
  }
  const updatedUser = await User.findByIdAndUpdate(auth0UserId, req.body, {
    new: true,
  });
  res.send(updatedUser);
};

export const usersController = {
  getAllUsers,
  getUserById,
  getProfile,
  editProfile,
};
