const bcrypt = require("bcrypt");
const Rekam = require("../models/rekam");

module.exports = {
  getAllrekam: async (req, res) => {
    if (req.query.id_pasien) {
      try {
        const rekam = await Rekam.find({
          pasien: req.query.id_pasien,
        })
          .populate("konsultasi")
          .populate("pasien");
        res.status(200).json({
          message: "Successfully get medical records data",
          data: rekam,
        });
      } catch (err) {
        res.status(400).json({
          message: "Failed to get medical records data",
          data: err,
        });
      }
    } else {
      try {
        const rekam = await Rekam.find()
          .populate("konsultasi")
          .populate("pasien");
        res.json({
          message: "Successfully get medical records data",
          data: rekam,
        });
      } catch (err) {
        res.status(400).json({
          message: "Failed to get medical records data",
          data: err,
        });
      }
    }
  },

  getrekamByID: async (req, res) => {
    try {
      const rekam = await Rekam.findById(req.params.rekamId)
        .populate("konsultasi")
        .populate("pasien");
      res.status(200).json({
        message: "Successfully get medical records data",
        data: rekam,
      });
    } catch (err) {
      res
        .status(403)
        .json({ message: "Failed to get medical records data", data: err });
    }
  },

  addrekam: async (req, res) => {
    try {
      const rekam = new Rekam(req.body);
      await rekam.save();
      res.status(200).json({
        message: "Successfully add medical records data",
      });
    } catch (err) {
      res.status(400).json({
        message: "Failed to add medical records data",
        data: err,
      });
    }
  },

  deleterekamByID: async (req, res) => {
    try {
      const rekam = await Rekam.findById(req.params.rekamId, "-__v");

      if (!rekam) {
        res.status(404).json({
          message: "Could not Found",
        });
      } else {
        rekam.deleteOne();
        res.status(201).json({
          message: "Successfully delete medical records data",
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  },

  updaterekamByID: async (req, res) => {
    try {
      const updateRekam = await Rekam.updateOne(
        { _id: req.params.rekamId },
        {
          $set: req.body,
        }
      );

      res.status(200).json({
        message: "Successfully update medical records data",
        data: updateRekam,
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  },
};
