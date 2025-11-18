const { default: mongoose } = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      
    },
    minPrice:{
      type:Number,
      required:true
    },
    amount:{
      type:Number,
      required:true
    }
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
