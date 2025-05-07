import Package from "../models/package.model.js";
import braintree from "braintree";
import dotenv from "dotenv";
import Booking from "../models/booking.model.js";
dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//create package
export const createPackage = async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  try {
    const {
      packageName,
      packageDescription,
      packageDestination,
      packageDays,
      packageNights,
      packageAccommodation,
      packageTransportation,
      packageMeals,
      packageActivities,
      packagePrice,
      packageDiscountPrice,
      packageOffer,
      // packageImages,
    } = req.body;

    // ❗ multer 处理后的文件保存在 req.files
    const packageImages = req.files;
    console.log("Package Images: ", packageImages);
    console.log("到这了1")
    console.log("packageName", packageName);
    console.log("packageDescription", packageDescription);
    console.log("packageDestination", packageDestination);
    console.log("packageDays", packageDays);
    console.log("packageNights", packageNights);
    console.log("packageAccommodation", packageAccommodation);
    console.log("packageTransportation", packageTransportation);
    console.log("packageMeals", packageMeals);
    console.log("packageActivities", packageActivities);
    console.log("packagePrice", packagePrice);
    console.log("packageDiscountPrice", packageDiscountPrice);
    console.log("packageOffer", packageOffer);
    console.log("packageImages", packageImages);
    if (
      !packageName ||
      !packageDescription ||
      !packageDestination ||
      !packageAccommodation ||
      !packageTransportation ||
      // !packageMeals ||
      !packageActivities ||
      !packageOffer ||  
      !packageImages || packageImages.length === 0
    ) {
      return res.status(200).send({
        success: false,
        message: "All fields are required!",
      });
    }
    console.log("到这了2")
    // if (packagePrice < packageDiscountPrice) {
    //   return res.status(200).send({
    //     success: false,
    //     message: "Regular price should be greater than discount price!",
    //   });
    // }
    // if (packagePrice <= 0 || packageDiscountPrice < 0) {
    //   return res.status(200).send({
    //     success: false,
    //     message: "Price should be greater than 0!",
    //   });
    // }
    // if (packageDays <= 0 && packageNights <= 0) {
    //   return res.status(200).send({
    //     success: false,
    //     message: "Provide days and nights!",
    //   });
    // }
    console.log("到这了");
    // 提取图片文件名（或 file.path）
    const imagePaths = "src/pages/img/"+packageImages.map(file => file.filename); // or file.path if full path needed

    const newPackage = await Package.create({
      ...req.body,
      packageImages: imagePaths,
    });
    console.log(newPackage);
    if (newPackage) {
      return res.status(201).send({
        success: true,
        message: "Package created successfully",
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Soemthing went wrong",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//get all packages
export const getPackages = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const packages = await Package.find({
      $or: [
        { packageName: { $regex: searchTerm, $options: "i" } },
        { packageDestination: { $regex: searchTerm, $options: "i" } },
      ],
      packageOffer: offer,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    if (packages) {
      return res.status(200).send({
        success: true,
        packages,
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "No Packages yet",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//get package data
export const getPackageData = async (req, res) => {
  try {
    const packageData = await Package.findById(req?.params?.id);
    if (!packageData) {
      return res.status(404).send({
        success: false,
        message: "Package not found!",
      });
    }
    return res.status(200).send({
      success: true,
      packageData,
    });
  } catch (error) {
    console.log(error);
  }
};

//update package
export const updatePackage = async (req, res) => {
  try {
    const findPackage = await Package.findById(req.params.id);
    if (!findPackage)
      return res.status(404).send({
        success: false,
        message: "Package not found!",
      });

    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Package updated successfully!",
      updatedPackage,
    });
  } catch (error) {
    console.log(error);
  }
};

//delete package
export const deletePackage = async (req, res) => {
  try {
    const deletePackage = await Package.findByIdAndDelete(req?.params?.id);
    return res.status(200).send({
      success: true,
      message: "Package Deleted!",
    });
  } catch (error) {
    cnsole.log(error);
  }
};

//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
