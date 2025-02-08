import {storageService, storagService} from "./async-storage.service"

const BOOKS_KEY = 'books';

export const bookService = {
    query,
    get,
    remove,
    save
}

const demoBooks = [
    {
        id: 'b101',
        title: 'The Great Adventure',
        listPrice: { amount: 20, currencyCode: 'USD', isOnSale: false },
    },
    {
        id: 'b102',
        title: 'Mystery of the Blue Moon',
        listPrice: { amount: 15, currencyCode: 'EUR', isOnSale: true },
    },
    {
        id: 'b103',
        title: 'Science Wonders',
        listPrice: { amount: 25, currencyCode: 'GBP', isOnSale: false },
    },
]

async function query(filterBy = {}) {
    let books = await storagService.query(BOOKS_KEY)
    if(!books || books.length===0){
        books = demoBooks
        books.forEach(book => storagService.post(BOOKS_KEY,book));
    }

    // return storageService.query(BOOKS_KEY)
    //     .then(books => {
    //         if (filterBy.txt) {
    //             const regExp = new RegExp(filterBy.txt, 'i')
    //             books = books.filter(book => regExp.test(book.title))
    //         }
    //         // if (filterBy.minSpeed) {
    //         //     cars = cars.filter(car => car.speed >= filterBy.minSpeed)
    //         // }
    //         return books
    //     })
}

function get(bookId){
    return storagService.get(BOOKS_KEY,bookId)
}

function remove(bookId){
    return storagService.remove(BOOKS_KEY.bookId)
}

function save(book){
    if(book.id){
        return storagService.put(BOOKS_KEY,book)
    }
    else{
        return storageService.post(BOOKS_KEY,book)
    }
}

query();