const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    nama: {
      type: String,
      required: [true, "Nama tidak boleh kosong"],
    },
    username: {
      type: String,
      required: [true, "Username tidak boleh kosong"],
    },
    email: {
      type: String,
      required: [true, "Email tidak boleh kosong"],
    },
    password: {
      type: String,
      required: [true, "Password tidak boleh kosong"],
    },
    role: {
      type: String,
      enum: ["nakes", "dokter"],
      required: [true, "Role hanya boleh nakes atau dokter"],
    },
  })
);

module.exports = User;
