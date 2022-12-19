const bcrypt = require("bcrypt");
const Konsultasi = require("../models/konsultasi");

module.exports = {
  getAllKonsultasi: async (req, res) => {
    if (req.query.status) {
      try {
        const konsultasi = await Konsultasi.find({
          status: req.query.status,
        })
          .populate("pasien")
          .populate("dokter", "nama");
        res.status(200).json({
          message: "Successfully get consultation data",
          data: konsultasi,
        });
      } catch (err) {
        res.status(400).json({
          message: "Failed to get consultation data",
          data: err,
        });
      }
    } else if (req.query.id_pasien) {
      console.log(req.query.id_pasien);
      try {
        const konsultasi = await Konsultasi.find({
          pasien: req.query.id_pasien,
        })
          .populate("pasien")
          .populate("dokter", "nama");
        res.status(200).json({
          message: "Successfully get consultation data",
          data: konsultasi,
        });
      } catch (err) {
        res.status(400).json({
          message: "Failed to get consultation data",
          data: err,
        });
      }
    } else {
      try {
        const konsultasi = await Konsultasi.find()
          .populate("pasien")
          .populate("dokter", "nama");
        res.status(200).json({
          message: "Successfully get consultation data",
          data: konsultasi,
        });
      } catch (err) {
        res.status(400).json({
          message: "Failed to get consultation data",
          data: err,
        });
      }
    }
  },
  getKonsultasiById: async (req, res) => {
    try {
      const konsultasi = await Konsultasi.findById(req.params.konsultasiId)
        .populate("pasien")
        .populate("dokter", "nama");
      res.status(200).json(konsultasi);
    } catch (err) {
      res
        .status(403)
        .json({ message: "Failed to get consultation data", data: err });
    }
  },
  addKonsultasi: async (req, res) => {
    const konsultasi = new Konsultasi(req.body);
    try {
      const savedKonsultasi = await konsultasi.save();
      res.status(200).json({
        message: "Successfully add consultation data",
        data: savedKonsultasi,
      });
    } catch (err) {
      res
        .status(403)
        .json({ message: "Failed to add consultation data", data: err });
    }
  },

  updateKonsultasi: async (req, res) => {
    try {
      const updatedKonsultasi = await Konsultasi.updateOne(
        { _id: req.params.konsultasiId },
        {
          $set: req.body,
        }
      );
      res.status(200).json({
        message: "Consulation has been updated",
        data: updatedKonsultasi,
      });
    } catch (err) {
      res.status(400).json({
        message: "Failed to update consulation",
        data: err,
      });
    }
  },
  deleteKonsultasi: async (req, res) => {
    try {
      const removedKonsultasi = await Konsultasi.remove({
        _id: req.params.konsultasiId,
      });
      res.status(200).json({
        message: "Consulation has been deleted",
        data: removedKonsultasi,
      });
    } catch (err) {
      res.status(403).json({
        message: "Failed to delete consulation",
        data: err,
      });
    }
  },
};
