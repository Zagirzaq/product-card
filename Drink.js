export class Drink {
    #temperature;
    constructor(name, size, priсe, temperature) {
        this.name = name;
        this.size = size;
        this.priсe = priсe;
        this.#temperature = temperature;
    }
    
    getInfo() {
        return `${this.name} (${this.size}), цена: ${this.priсe}₽, температура: ${this.#temperature}°C`;
    }
    
    getTemperature() {
        return this.#temperature;
    }
    
    setTemperature(newTemp) {
        if (typeof newTemp === 'number' && newTemp >= 0 && newTemp <= 100) {
            console.log(`Изменение температуры ${this.name} с ${this.#temperature}°C на ${newTemp}°C.`);
            this.#temperature = newTemp;
        } else {
            console.log('Ошибка: температура должна быть числом от 0 до 100.');
        }
    }
    
    #prepare() {
        console.log(`Приготовление ${this.name}...`);
    }

    serve() {
        console.log(`Подаём ${this.name}...`);
        this.#prepare();
        console.log('Напиток готов к употреблению!');
    }
}