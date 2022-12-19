const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  getAllKonsultasi,
  getKonsultasiById,
  addKonsultasi,
  updateKonsultasi,
  deleteKonsultasi,
} = require("../controllers/konsultasi.controller");

// router.use([auth.verifyToken, auth.isNakes])

router.get("/", getAllKonsultasi);
router.get("/:konsultasiId", getKonsultasiById);
router.post("/", addKonsultasi);
router.patch("/:konsultasiId", updateKonsultasi);
router.delete("/:konsultasiId", deleteKonsultasi);

module.exports = router;
