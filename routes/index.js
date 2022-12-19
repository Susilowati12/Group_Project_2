const express = require("express");
const router = express.Router();

const pasienRouter = require("./pasien.router");
const authRouter = require("./auth.router");
const konsultasiRouter = require("./konsultasi.router");
const rekamRouter = require("./rekam.router");
const userRouter = require("./user.router");

router.use("/pasien", pasienRouter);
router.use("/auth", authRouter);
router.use("/konsultasi", konsultasiRouter);
router.use("/rekam", rekamRouter);
router.use("/user", userRouter);

module.exports = router;
