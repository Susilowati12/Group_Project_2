const mongoose = require("mongoose");
const { Schema } = mongoose;

const rekamSchema = new Schema({
  konsultasi: {
    type: Schema.Types.ObjectId,
    ref: "Konsultasi",
  },
  pasien: {
    type: Schema.Types.ObjectId,
    ref: "Pasien",
  },
  anamnesis: String,
  diagnosis: String,
  obat: String,
  catatan:String,
  tanggal_rekam: {
    type: Date,
    default: Date.now,
    },
 
});

const Rekam = mongoose.model("Rekam", rekamSchema);

module.exports = Rekam;
