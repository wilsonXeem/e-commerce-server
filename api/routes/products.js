const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const express = require("express");
const router = express.Router();
const multer = require("multer");

cloudinary.config({
  cloud_name: "muyi-hira-app",
  api_key: "324347284575678",
  api_secret: "jE7V2LLM0-2zz0cNPHLlCkXuU4E",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ecommerce-site',
  }
})

const upload = multer({
  storage: storage,
});

const ProductController = require("../controllers/products");

router.get("/", ProductController.getAllProducts);

router.post(
  "/",
  upload.single("productImage"),
  ProductController.createOneProduct
);

router.get("/:productId", ProductController.getOneProduct);

router.patch("/:productId", ProductController.updateOneProduct);

router.delete("/:productId", ProductController.deleteOneProduct);

module.exports = router;
