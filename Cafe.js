import { Tea } from "./Tea.js";
import { Coffee } from "./Coffee.js";
import { Milkshake } from "./Milkshake.js";

export class Cafe {
    constructor(name, location) {
        this.name = name;
        this.location = location;
    }
    
    getInfo() {
        console.log(`Кафе "${this.name}"`);
        console.log(`Адрес: ${this.location}`);
    }
    
    orderDrink(drink) {
        console.log(`Вы заказали: ${drink.name}`);
        drink.serve();
    }
}


const myCafe = new Cafe('Уютный уголок', 'ул. Программистов, д. 1');
myCafe.getInfo();


const americano = new Coffee('Американо', 'средний', 150, 20, 'Арабика', 'соевое');
const greenTea = new Tea('Зелёный чай', 'большой', 120, 25, 'зелёный', 'жасмин');
const berryShake = new Milkshake('Ягодный коктейль', 'маленький', 180, 6, 'малина', 'пломбир');

myCafe.orderDrink(americano);
myCafe.orderDrink(greenTea);
myCafe.orderDrink(berryShake);

console.log(americano.getInfo());
americano.setTemperature(60);
console.log(`Новая температура американо: ${americano.getTemperature()}°C`);