const { default: mongoose } = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
