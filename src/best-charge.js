const Cart = require('./Cart.js');
const OrderComputer = require('./OrderComputer');

module.exports = function bestCharge(selectedItems) {
  let cart = new Cart(selectedItems);
  let orderComputer = new OrderComputer(cart.foodOrders);
  let inventory = orderComputer.getInventory();
  return inventory;
}
