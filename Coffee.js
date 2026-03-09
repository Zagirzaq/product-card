import { Drink } from './Drink.js';

export class Coffee extends Drink {
    constructor(name, size, price, temperature, beanType, milkType) {
        super(name, size, price, temperature)
        this.beanType = beanType;
        this.milkType = milkType;
    }
    
    getInfo() {
        return `${super.getInfo()}, зёрна: ${this.beanType}, молоко: ${this.milkType}`;
    }
}