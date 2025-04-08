import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import cloudinary from "../cloudnary/cloudnaryConfig.js";
const fetchAllUsers = async (req, res) => {
  try {
    let allUsers = await User.findAll({
      attributes: {
        exclude : ['password']
      }
    });
    let { password: _, ...withouPassword } = allUsers;
    res.json(allUsers);
  } catch (error) {
    res.status(500).send({
      message: `Error in fecthing ${error.message}`,
      status: 500,
    });
  }
};

const fetchUserByID = async (req, res) => {
  let userID = req.params.id;
  try {
    let user = await User.findOne({
      where: {
        id: userID,
      },
    });
    res.json({ user });
  } catch (error) {
    res.status(500).send({
      message: `Cannot find user of id ${userID} ${error.message}`,
      status: false,
    });
  }
};

const addUser = async (req, res) => {
  let { firstName, lastName, email, password } = req.body;

  let file = req.file;
  let userImage = null;
  if(file){
    const uploadResponse = (await cloudinary.uploader.upload(file.path));
    userImage = uploadResponse.secure_url;
  }

  try {
    let hashedPassword = await bcrypt.hash(password, 10);

    let user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profile: userImage
    });

    res.status(201).json({ message: "User has been added successfully", user , uploadedFile: userImage });
  } catch (error) {
    console.log("Error in controller to add user ", error);
    res.status(500).json({
      message: "User not added Error in controller",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(501).json({ message: "user not found" });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const { password: _, ...userWithoutPassword } = user.toJSON();

    res
      .status(200)
      .json({ message: "Login successfully", user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};
export { fetchAllUsers, fetchUserByID, addUser, loginUser };
