const Database = require("./dataBase")
const Author = require("./entities/Author")
const Book = require("./entities/Book")
const User = require("./entities/User")
const Poster = require("./entities/Poster")
const Order = require("./entities/Order")

class App {
    static #dataBase = new Database()

    createUser(name, email, password) {
        const user = new User(name, email, password)
        App.#dataBase.saveUser(user)
    }

    getUsers() {
        return App.#dataBase.find('users')
    }

    createAuthor(name, nationality, bio) {
        const author = new Author(name, nationality, bio)
        App.#dataBase.saveAuthor(author)
    }

    getAuthors() {
        return App.#dataBase.find('authors')
    }

    createBook(title, synopsis, genre, pages, author, description, price, inStock) {
        const book = new Book(title, synopsis, genre, pages, author, description, price, inStock)
        App.#dataBase.saveBook(book)
    }

    addBook(bookName, quantity) {
        App.#dataBase.addBookToStock(bookName, quantity)
    }

    getBooks() {
        return App.#dataBase.find('books')
    }

    createPoster(name, description, height, width, price, inStock) {
        const poster = new Poster(name, description, height, width, price, inStock)
        App.#dataBase.savePoster(poster)
    }

    addPoster(posterName, quantity) {
        App.#dataBase.addPosterToStock(posterName, quantity)
    }

    getPosters() {
        return App.#dataBase.find('posters')
    }

    createOrder(items, user) {
        const order = new Order(items, user)
        App.#dataBase.saveOrder(order)
        order.data.items.forEach(({ product, quantity }) => {
            if (product instanceof Book) {
                App.#dataBase.removeBooksFromStock(product.name, quantity)
            } else if (product instanceof Poster) {
                App.#dataBase.removePosterFromStock(product.name, quantity)
            }
        })
    }

    getOrders() {
        return App.#dataBase.find('orders')
    }

    showDataBase() {
        App.#dataBase.showStorage()
    }
}

module.exports = App