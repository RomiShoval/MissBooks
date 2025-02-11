import { bookService } from "../services/bookService.js";
import "../assets/style/pages/BookIndex.css"
import { BookList } from "../cmps/BookList.jsx";
import { BookFilter } from "../cmps/BookFilter.jsx";

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function BookIndex(){
    const[books,setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(()=>{
        loadBooks()
    },[filterBy])

    function loadBooks(){
        bookService.query(filterBy)
        .then(fetchedBooks => {
            console.log("Fetched books from bookService:", fetchedBooks)
            setBooks(fetchedBooks || [])
        })
        .catch(err => {
            console.error("Cannot get books", err)
            setBooks([]);
        });
    }

   
    function onRemoveBook(bookId){
        bookService.remove(bookId)
            .then(()=>{
                setBooks(books => books.filter(book => book.id!==bookId))
            })
            .catch(() =>{
                console.log('Cannot remove book :' ,err)
            })
    }

    function onSetFilter(filterBy) {
        // console.log('filterBy:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }


    return (
        <div className="book-index">
            <h2>📚 Book List</h2>
            <BookFilter filterBy={filterBy} onSetFilter={onSetFilter}/>
            <button><Link to="/book/edit">Add Book</Link></button>
            <BookList 
                books={books}
                onRemoveBook={onRemoveBook} />
        </div>
    );
}