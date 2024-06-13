const express = require("express");
const {
  getAllProducts,
  findProductByTitle,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/add").post(addProduct);
router.route("/products/find").get(findProductByTitle);
router.route("/products/:id").put(updateProduct);
router.route("/products/:id").delete(deleteProduct);

module.exports = router;
