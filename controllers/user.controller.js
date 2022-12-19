const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const KEY = "asdfjsdaklf234234";
module.exports = {
  login: (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
      .then((data) => {
        bcrypt.compare(password, data.password, (err, result) => {
          if (err) {
            res.status(500).json({ message: err });
          } else {
            if (result) {
              const token = jwt.sign({ id: data._id, role: data.role }, KEY);
              res
                .status(200)
                .json({ message: "Login is successfull", token: token,id: data._id,username:data.username,email:data.email, role: data.role });
            } else {
              res.status(403).json({ message: "Login is failed" });
            }
          }
        });
      })
      .catch((err) => {
        res.status(403).json({ message: "Login is failed" });
      });
  },

  register: async (req, res) => {
    try {
      const data = req.body;
      const saltRounds = 10;
      const hash = bcrypt.hashSync(data.password, saltRounds);
      data.password = hash;
      const user = new User(data);
      await user.save();
      res.json({
        message: "Sukses",
      });
    } catch (err) {
      res.status(400).json({
        message: "Gagal",
        error: err.errors,
      });
    }
  },
  logout: async (req, res) => {
    try {
      return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
      this.next(err);
    }
  },
  getAllUser: async (req, res) => {
    if (req.query.role) {
      try {
        const user = await User.find(
          { role: req.query.role },
          "-__v -password"
        );
        res.status(200).json({
          message: "success ",
          data: user,
        });
      } catch (err) {
        res.status(500).json({
          message: "internal server error",
        });
      }
    } else {
      try {
        const users = await User.find({}, "-__v -password");
        res.json({
          message: "success get data user",
          data: users,
        });
      } catch (error) {
        console.log(error);
      }
    }
  },

  getUserByID: async (req, res) => {
    try {
      const users = await User.find(
        {
          _id: req.params.id,
        },
        "-__v -password"
      );
      res.status(200).json({
        message: "Successful get data user",
        data: users,
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error });
    }
  },

  deleteUserByID: async (req, res) => {
    try {
      const users = await User.findById(req.params.id, "-__v -password");
      if (!users) {
        res.status(404).json({
          message: "Could not Found",
        });
      } else {
        users.deleteOne();
        res.status(201).json({
          message: "Data Deleted",
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  },

  updateUserByID: async (req, res) => {
    try {
      const users = await User.findById(req.params.id, "-__v -password");
      Object.assign(users, req.body);
      users.save();
      res.status(201).send({
        message: "User updated!",
        data: users,
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  },
};
