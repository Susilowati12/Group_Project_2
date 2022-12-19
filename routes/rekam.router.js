const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getAllrekam,
  getrekamByID,
  addrekam,
  deleterekamByID,
  updaterekamByID,
} = require("../controllers/rekam.controller");
// router.use([auth.verifyToken, auth.isDokter]);
router.get("/", getAllrekam);
router.get("/:rekamId", getrekamByID);
router.post("/", addrekam);
router.delete("/:rekamId", deleterekamByID);
router.patch("/:rekamId", updaterekamByID);

module.exports = router;
