import { bookService } from "../services/bookService.js";
import "../assets/style/pages/BookIndex.css"
import { BookList } from "../cmps/BookList.jsx";
import { BookFilter } from "../cmps/BookFilter.jsx";
import {sendSuccsessMsg , sendErrorMsg} from "../services/eventBusService.js"

const { useState, useEffect } = React
const { Link,useNavigate } = ReactRouterDOM

export function BookIndex(){
    const[books,setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const navigate = useNavigate();

    function goToAddBook() {
        navigate("/book/add");
    }

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
                console.log('try to delete')
                setBooks(books => books.filter(book => book.id!==bookId))
                sendSuccsessMsg(`Book ${bookId} deleted successfuly!`)
            })
            .catch((err) =>{
                console.log(`doesnt delete`)
                console.log('Cannot remove book :' ,err)
                sendErrorMsg(`Book had a problem to be removed`)
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
            <button onClick={goToAddBook}>Add Book
                {/* <Link to="/book/add">Add Book</Link> */}
            </button>
            <BookList 
                books={books}
                onRemoveBook={onRemoveBook} />
        </div>
    );
}