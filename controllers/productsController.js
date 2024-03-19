const Product = require('../models/product');

exports.createProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  const owner = req.user.email;

  try {
    const product = new Product({ name, price, stock, owner });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.pid;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (req.user.role === 'admin' || (req.user.role === 'premium' && product.owner === req.user.email)) {
      await product.remove();
      return res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};