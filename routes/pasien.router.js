const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getAllPasien,
  getPasienByID,
  addPasien,
  deletePasienByID,
  deletePasien,
  updatePasienByID,
} = require("../controllers/pasien.controller");
// router.use([auth.verifyToken, auth.isNakes]);
router.get("/", getAllPasien);
router.get("/:id", getPasienByID);
router.post("/", addPasien);
router.delete("/:id", deletePasienByID);
router.delete("/", deletePasien);
router.patch("/:id", updatePasienByID);

module.exports = router;
