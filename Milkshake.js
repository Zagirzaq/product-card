import { Drink } from './Drink.js';

export class Milkshake extends Drink {
    constructor(name, size, price, temperature, toppingTaste, iceCreamTaste) {
        super(name, size, price, temperature)
        this.toppingTaste = toppingTaste;
        this.iceCreamTaste = iceCreamTaste;
    }
    
    getInfo() {
        return `${super.getInfo()}, топпинг: ${this.toppingTaste}, мороженое: ${this.iceCreamTaste}`;
    }
}