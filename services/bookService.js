import {storageService} from "./async-storage.service.js"

const BOOKS_KEY = 'books';

export const bookService = {
    loadBooks,
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

async function loadBooks() {
    let books = await storageService.query(BOOKS_KEY)
    if(!books || books.length ===0){
        console.log("No books found. Initializing with demo books.");
        books = [...demoBooks]
        await storageService.postMany(BOOKS_KEY, books);
        // console.log(books)
        // await Promise.all(books.map(book => storageService.post(BOOKS_KEY, book)));
        books = await storageService.query(BOOKS_KEY)
    }
    console.log("Fetched books:",books)
    return books
}

function get(bookId){
    return storageService.get(BOOKS_KEY,bookId)
}

function remove(bookId){
    return storageService.remove(BOOKS_KEY,bookId)
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

loadBooks();