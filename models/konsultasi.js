const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KonsultasiSchema = new Schema({
  pasien: {
    type: Schema.Types.ObjectId,
    ref: "Pasien",
    required: true,
  },
  dokter: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  poli: {
    type: String,
    required: true,
  },
  tanggal_konsultasi: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Konsultasi", KonsultasiSchema);
