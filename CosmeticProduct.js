export class CosmeticProduct {
    constructor(product, classProduct, price) {
        this.product = product;
        this.classProduct = classProduct;
    }
    
    getProductInfo() {
        console.log(`Вы купили ${this.product} - ${this.classProduct}`)
    }
}

export class ProductPrice extends CosmeticProduct {
    constructor(product, classProduct, price) {
        super(product, classProduct)
        this.price = price;
    }
    
    getProductPrice() {
        console.log(`Вы купили ${this.product} - ${this.classProduct} за ${this.price} рублей`)
    }
}

const shampoo = new CosmeticProduct('Шампунь', 'От перхоти');
shampoo.getProductInfo()

const mask = new ProductPrice('Маска', 'Увлажняющая', 3500);
mask.getProductPrice()