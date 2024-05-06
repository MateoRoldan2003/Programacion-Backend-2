const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
});

router.delete('/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
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