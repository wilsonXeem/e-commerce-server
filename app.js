const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const auth = require("./api/middlewares/auth");

const productsRoutes = require("./api/routes/products");
const userRoutes = require("./api/routes/user");
const orderRoutes = require("./api/routes/orders");

mongoose.connect(
  process.env.MONGO_URL_DEV || "mongodb://localhost:27017/e-commerce_app"
);

const app = express();

app.use(morgan("dev"));

// setup static files path
app.use("/uploads", express.static("uploads"));

// Use body parser to parse body of incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, DELETE, GET"
    );
    return res.status(200).json({});
  }
  next();
});

app.use(auth);

app.use("/products", productsRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);

// Error handling
app.use((req, res, next) => {
  const error = new Error();
  error.message = "Not Found";
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ error: error.message });
});

const port = 3000;
app.listen(port, () => console.log("working"));
