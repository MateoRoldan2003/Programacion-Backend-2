const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const nodemailer = require('nodemailer');
const productsController = require('../../../controllers/productsController');

const transporter = nodemailer.createTransport({

});

router.get('/', productsController.getAllProducts);

router.get('/:id', productsController.getProductById);

router.post('/', productsController.createProduct);

router.put('/:id', productsController.updateProduct);

router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (product.owner.role === 'premium') {

      const mailOptions = {
      };

      await transporter.sendMail(mailOptions);
    }

    await product.remove();
    res.json({ message: 'Producto borrado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;