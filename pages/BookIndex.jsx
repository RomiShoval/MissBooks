import { bookService } from "../services/bookService.js";
import "../assets/style/pages/BookIndex.css"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookIndex(){
    const[books,setBooks] = useState([])

    useEffect(()=>{
        bookService.query().then(fetchedBooks =>{
            setBooks(fetchedBooks || [])
        }).catch(err => {
            console.error('Error fetching books',err)
            setBooks([])
        })
    },[])


    return (
        <div className="book-index">
            <h2>Book List</h2>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <Link to={`/book/${book.id}`}>{book.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}