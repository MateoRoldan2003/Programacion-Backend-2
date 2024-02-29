const Cart = require('../models/cart');
const Product = require('../models/product');
const Ticket = require('../models/ticket');

exports.purchaseCart = async (req, res) => {
  const cartId = req.params.cid;

  try {
    const cart = await Cart.findById(cartId).populate('products.product');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const ticket = await createTicket(cart);

    res.status(200).json({ message: 'Purchase successful', ticket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

async function createTicket(cart) {
  const totalAmount = calculateTotalAmount(cart);

  const ticket = new Ticket({
    code: generateUniqueCode(),
    amount: totalAmount,
    purchaser: cart.user.email,
  });

  await ticket.save();

  return ticket;
}

function calculateTotalAmount(cart) {
}

function generateUniqueCode() {
}