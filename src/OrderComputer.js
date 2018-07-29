const DataBase = require ('./datbase.js');

module.exports = class OrderComputer{
    constructor(foodOrders){
        this.foodOrders = foodOrders;
        this.promotions = DataBase.loadPromotions();
    }

    getInventory(){
        let result = '============= 订餐明细 =============\n';
        result += this.getFoodOrderInfo().join('\n') + '\n';
        result += '-----------------------------------\n';
        if(this.hasPromotion()){
            result += "使用优惠:\n";
            result += this.getPromotionInfo()+'\n';
            result += '-----------------------------------\n';
        }
        result += `总计：${this.getSum()}元\n`;
        result += '===================================';
        return result;
    }

    getFoodOrderInfo(){
        let infos = this.foodOrders.map(foodOrder => {
            return `${foodOrder.name} x ${foodOrder.count} = ${foodOrder.price * foodOrder.count}元`;
        });
        return infos;
    }

    hasPromotion(){
        let promotion1 = this.getFullPromotion();
        let promotion2 = this.getHalfPromotion();
        return (promotion1!== 0 && promotion2!==0);
    }

    getFullPromotion(){
        let cost = this.getCost();
        return cost>=30 ? 6 : 0; 
    }

    getCost(){
        return this.foodOrders.reduce((sum, foodOrder) => {
            return sum + foodOrder.price * foodOrder.count;
        }, 0);
    }

    getHalfPromotion(){
        let promotion = this.promotions.find(p => p.type === '指定菜品半价');
        return this.foodOrders.reduce((sum, foodOrder) => {
            if(promotion.items.includes(foodOrder.id)){
                return sum + foodOrder.price / 2;
            }
            return sum;
        }, 0);
    }

    getPromotionInfo(){
        let promotion1 = this.getFullPromotion();
        let promotion2 = this.getHalfPromotion();
        return promotion1 >= promotion2 ? `满30减6元，省6元` : `指定菜品半价(${this.getHalfPromotionNames().join('，')})，省${this.getHalfPromotion()}元`;
    }

    getHalfPromotionNames(){
        let promotion = this.promotions.find(p => p.type === '指定菜品半价');
        return this.foodOrders.map(foodOrder => {
            if(promotion.items.includes(foodOrder.id)){
                return foodOrder.name;
            }
            return '';
        }).filter(name => name!=='');
    }

    getSum(){
        return this.getCost() - Math.max(this.getFullPromotion(),this.getHalfPromotion());
    }
    
}