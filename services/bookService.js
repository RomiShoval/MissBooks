import {storageService} from "./async-storage.service.js"

const BOOKS_KEY = 'books';

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook
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

async function query() {
    let books = await storageService.query(BOOKS_KEY)
    if(!books || books.length===0){
        books = demoBooks
        books.forEach(book => storageService.post(BOOKS_KEY,book));
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
    return storageService.get(BOOKS_KEY,bookId)
}

function remove(bookId){
    return storageService.remove(BOOKS_KEY.bookId)
}

function save(book){
    if(book.id){
        return storageService.put(BOOKS_KEY,book)
    }
    else{
        return storageService.post(BOOKS_KEY,book)
    }
}

function getEmptyBook({title='',listPrice ={amount:0,currencyCode:'USD',}}){
    return{title,listPrice}

}

query();