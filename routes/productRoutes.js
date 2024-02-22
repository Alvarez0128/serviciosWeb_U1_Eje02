const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  calculateInventoryValue,
  sortProductsByPrice,
  filterProductsByStock
} = require('../controllers/productController');

// Rutas CRUD
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

// Rutas adicionales
router.get('/search/:name', searchProducts);
router.get('/calculateInventoryValue', calculateInventoryValue);
router.get('/sortProductsByPrice/:order', sortProductsByPrice);
router.get('/filterProductsByStock/:quantity', filterProductsByStock);

module.exports = router;
