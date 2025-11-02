const bannerModel = require("../model/banner.model");
const fs = require("fs");
const path = require("path");

let addBannerController = async (req, res) => {
  let { link } = req.body;
  let { filename } = req.file;

  try {
    let banner = await new bannerModel({
      image: `${process.env.SERVER_URL}/${filename}`,
      link,
    });
    await banner.save();
    return res.status(201).json({
      success: true,
      message: "banner created successfull",
      data: banner,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};
// banner delete done
let deleteBannerController = async (req, res) => {
  try {
    let { id } = req.params;

    let deletebanner = await bannerModel.findOneAndDelete({ _id: id });
    let imageurl = deletebanner.image.split("/");

    let filepath = path.join(__dirname, "../../uploads");

    fs.unlink(`${filepath}/${imageurl[imageurl.length - 1]}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("file deleted successfull");
      }
    });
    return res.send(deletebanner);

    // await  bannerModel.findByIdAndDelete(id)

    // return res.status(200).json({success:true,message:"banner deleted succussfull"})
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, messamge: message.error || error });
  }
};
// update banner
let updateBannerController = async (req, res) => {
  try {
    let { id } = req.params;
    let { filename } = req.file;

    let findbanner = await bannerModel.findOne({ _id: id });
    if (findbanner) {
      //old image path delete
      let imageurl = findbanner.image.split("/");

      let filepath = path.join(__dirname, "../../uploads");

      fs.unlink(`${filepath}/${imageurl[imageurl.length - 1]}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
      //old image path delete
      // findbanner.image = `${process.env.SERVER_URL}/${filename}`;
      // await findbanner.save();

    let update = await bannerModel.findOneAndUpdate(
      { _id: id },
      { image: `${process.env.SERVER_URL}/${filename}` },
      { new: true }
    );
     await update.save()
      return res
        .status(200)
        .json({ success: true, message: "banner update successfull",data:update });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "banner not found" });
    }
    res.send(id);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

// get all banners 

let allBannersController=async(req,res)=>{
  try {

    let allbanners=await bannerModel.find({})

    if(allbanners.length ==0){
      return res.status(404).json({success:false,message:"banner not found"})
    }else{
      return res.status(200).json({success:true,message:"banner fetch successfull",data:allbanners})

    }
} catch (error) {
    return res.status(500).json({success:false,message:error.message ||error})
    
  }
}

module.exports = {
  addBannerController,
  deleteBannerController,
  updateBannerController,
  allBannersController
};
