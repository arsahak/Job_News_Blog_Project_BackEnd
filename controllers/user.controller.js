const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAllProfile = async (req, res) => {
  try {
    const users = await User.find({ email: req.email });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Email already exists");
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
      });

      await newUser
        .save()
        .then((user) => {
          res.send({
            success: true,
            message: "User is created Successfully",
            user: {
              id: user._id,
              email: user.email,
            },
          });
        })
        .catch((error) => {
          res.send({
            success: false,
            message: "User is not created",
            error: error,
          });
        });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params._id });
    if (user) {
      bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = hash;
        await user
          .save()
          .then((user) => {
            res.send({
              success: true,
              message: "User is update Successfully",
              user: {
                id: user._id,
                email: user.email,
              },
            });
          })
          .catch((error) => {
            res.send({
              success: false,
              message: "User is not update",
              error: error,
            });
          });
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "user is deleted" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });

    return res.status(200).send({
      success: true,
      message: "User is logged in successfully",
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: "Bearer " + token,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).send({
      success: false,
      message: "An error occurred during login",
      error: error.message,
    });
  }
};

const loginWithAuth = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const payload = {
        id: user._id,
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "2d",
      });

      return res.status(200).send({
        success: true,
        message: "User is logged in successfully",
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: "Bearer " + token,
      });
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      });

      const savedUser = await newUser.save();

      const payload = {
        id: savedUser._id,
        email: savedUser.email,
      };

      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "2d",
      });

      return res.status(200).send({
        success: true,
        message: "User is logged in successfully",
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
        token: "Bearer " + token,
      });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).send({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getAllProfile,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  loginWithAuth,
};
