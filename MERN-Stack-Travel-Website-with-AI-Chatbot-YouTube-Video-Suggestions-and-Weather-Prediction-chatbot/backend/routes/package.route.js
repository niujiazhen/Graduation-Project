import express from "express";
import multer from "multer";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  braintreeTokenController,
  createPackage,
  deletePackage,
  getPackageData,
  getPackages,
  updatePackage,
} from "../controllers/package.controller.js";

const router = express.Router();

// 输出当前工作路径
console.log("当前工作路径是:", process.cwd());
// 配置 multer 存储方式（本地磁盘）
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/src/pages/img'); // 确保你有这个文件夹
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

//create package
router.post("/create-package", upload.array("packageImages"),createPackage);

//update package by id
router.post("/update-package/:id", updatePackage);

//delete package by id
router.delete("/delete-package/:id", deletePackage);

//get all packages
router.get("/get-packages", getPackages);

//get single package data by id
router.get("/get-package-data/:id", getPackageData);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

export default router;
