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