import { Drink } from './Drink.js';

export class Tea extends Drink {
    constructor(name, size, price, temperature, teaType, milkType) {
        super(name, size, price, temperature)
        this.teaType = teaType;
        this.milkType = milkType;
    }
    
    getInfo() {
        return `${super.getInfo()}, тип чая: ${this.teaType}, добавка: ${this.additive}`;
    }
}