const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    eventname: {
      type: String,
      require: true,
    },
    guest: {
      type: String,
      require: true,
    },
    service: {
      type: String,
      require: true,
    },
    music: {
      type: Array,
      require: true,
    },
    language: {
      type: Array,
      require: true,
    },
    venue: {
      type: Array,
      require: true,
    },
    selecteddate: {
      type: String,
    },
    selectedoptiondate: {
      type: String,
    },

    date: {
      type: String,
      //   require: true,
    },

    needdate: {
      type: String,
      //   require: true,
    },

    address: {
      type: String,
      require: true,
    },
    phonenumber: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
