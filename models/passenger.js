const mongoose = require("mongoose");
const passengerSchema = new mongoose.Schema(
  {
    personInfo: { type: mongoose.Schema.Types.ObjectId, ref: "person" },
  },
  { timestamps: true }
);
const passenger = mongoose.model("passenger", passengerSchema);
module.exports = passenger;

//other approach

// const mongoose = require("mongoose");
// const passengerSchema = new mongoose.Schema(
//   {
//     personInfo: { type: mongoose.Schema.Types.ObjectId, ref: "person" },
//     orders: [
//       { car: { type: mongoose.Schema.ObjectId, ref: "car" }, timestamps: ture },
//     ],
//   },
//   { timestamps: true }
// );
// const passenger = mongoose.model("passenger", passengerSchema);
// module.exports = passenger;
