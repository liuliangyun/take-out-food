const FoodOrder = require ('./FoodOrder.js');

module.exports = class Cart{
    constructor(inputs){
        this.foodOrders = this.getFoodOrders(inputs);
    }

    getFoodOrders(inputs){
        return inputs.map(input => FoodOrder.parse(input));
    }

}