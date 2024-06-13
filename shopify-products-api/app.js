const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use(cookieParser());

const productRoutes = require("./routes/product");

app.use("/api", productRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Shopify Products API");
});

module.exports = app;
