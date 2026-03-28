import './homework-4.js';
import './homework-5.js';
import './homework-6.js';
import './homework-7.js';
import './homework-8.js';
import './homework-9.js';
import './CosmeticProduct.js';
import './homework-12/Modal.js';
import './Form.js';
import { Tea } from "./Tea.js";
import { Coffee } from "./Coffee.js";
import { Milkshake } from "./Milkshake.js";
import { Cafe } from "./Cafe.js";

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