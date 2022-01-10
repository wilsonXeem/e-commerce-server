const mongoose = require("mongoose");
const Product = require("../models/product");

// Get All Products
exports.getAllProducts = (req, res, next) => {
  Product.find()
    .exec()
    .then((products) => {
      const response = {
        count: products.length,
        products: products.map((product) => {
          return {
            _id: product._id,
            name: product.name,
            price: product.price,
            productImage: product.productImage,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((error) => next(error));
};

// Create One Product
exports.createOneProduct = (req, res, next) => {
  const product = createProduct(req);
  product
    .save()
    .then((product) => {
      res.status(200).json({
        message: "Product Created Succefully",
        product: {
          _id: product._id,
          name: product.name,
          price: product.price,
          productImage: product.productImage,
        },
      });
    })
    .catch((error) => next(error));
};

// Get One product
exports.getOneProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select("_id name, price productImage")
    .exec()
    .then((product) => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({
          message: "Product Not Found",
        });
      }
    })
    .catch((error) => next(error));
};

// Update One Product
exports.updateOneProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.updateOne({ _id: productId }, { $set: req.body })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Updated Product Successfully",
        result: result,
      });
    })
    .catch((error) => next(error));
};

// Delete One Product
exports.deleteOneProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.remove({ _id: productId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Deleted Product Successfully",
      });
    })
    .catch((error) => next(error));
};

const createProduct = (req) => {
    console.log(req.file.path);
  return new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
  });
};
