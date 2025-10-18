const jwt = require("jsonwebtoken");

const TokenCheckMiddleware = (req, res, next) => {
  let { token } = req.headers;

  try {
    jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
      if(err){
        return res.status(400).json({success:false,message:err.message});
        
      }else{
        req.userData=decoded
        next();
        
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: err.message });
  }

};

const adminCheck=(req,res,next)=>{
if(req.userData.role=="admin"){
    next()
}else{
    return res.status(400).json({success:false,message:"access denaid"})
}

}

module.exports = { TokenCheckMiddleware, adminCheck };
