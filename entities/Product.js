class Product {
    constructor(name, description, price, inStock = 0) {
        this.name = name
        this.description = description
        this.price = price
        this.inStock = inStock
    }

    addToStock(qtd) {
        this.inStock += qtd
    }

    removeFromStock(qtd) {
        this.inStock -= qtd
    }
}

module.exports = Product