const Product = require("../models/product");

let products = [];
let productIdCounter = 1;

const getProducts = (req, res) => {
  res.json(products);
};

const getProductById = (req, res) => {
  const productId = req.params.id;
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado.' });
  }

  res.json(product);
};

const addProduct = (req, res) => {
  const { name, description, price, stock } = req.body;
  const newProduct = new Product(String(productIdCounter++),name,description,price,stock);

  products.push(newProduct);
  res.status(201).json(newProduct);
};


const updateProduct = (req, res) => {
  const productId = req.params.id;
  const { name, description, price, stock } = req.body;
  const productIndex = products.findIndex(p => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Producto no encontrado.' });
  }

  // Actualizar los campos del producto
  products[productIndex] = {
    ...products[productIndex],
    name: name || products[productIndex].name,
    description: description || products[productIndex].description,
    price: price || products[productIndex].price,
    stock: stock || products[productIndex].stock
  };

  res.json(products[productIndex]);
};

const deleteProduct = (req, res) => {
  const productId = req.params.id;
  const productIndex = products.findIndex(p => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  // Eliminar el producto
  const deletedProduct = products.splice(productIndex, 1)[0];

  res.json(deletedProduct);
};

const searchProducts = (req, res) => {
  const searchQuery = req.params.name.toLowerCase();
  const matchingProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery));

  res.json(matchingProducts);
};

const calculateInventoryValue = (req, res) => {
  const totalValue = products.reduce((acc, product) => acc + product.price * product.stock, 0);

  res.json({ totalValue });
};

const sortProductsByPrice = (req, res) => {
  const order = req.params.order === 'asc' ? 1 : -1;
  const sortedProducts = [...products].sort((a, b) => order * (a.price - b.price));

  res.json(sortedProducts);
};

const filterProductsByStock = (req, res) => {
  const quantity = parseInt(req.params.quantity);
  const filteredProducts = products.filter(p => p.stock > quantity);

  res.json(filteredProducts);
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  calculateInventoryValue,
  sortProductsByPrice,
  filterProductsByStock,
};
