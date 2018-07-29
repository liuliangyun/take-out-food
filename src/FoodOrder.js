const DataBase = require('./datbase.js');

module.exports = class FoodOrder {
  constructor(id, count) {
    this.id = id;
    this.count = count;
    let foodItem = DataBase.loadAllItems().find(item => item.id === id); 
    this.name = foodItem.name;
    this.price = foodItem.price;
  }

  static parse(input) {
    let array = input.split(' x ');
    return new FoodOrder(array[0], array[1]);
  }
}
