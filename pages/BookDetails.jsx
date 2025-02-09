import { bookService } from "../services/bookService.js";
import "../assets/style/pages/BookDetails.css"
const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails(){
    const[book,setBook] = useState(null)
    const params = useParams()
    // const navigate = useNavigate()

    useEffect(() =>{
        bookService.get(params.bookId)
        .then(fetchedBooks =>{
            if(!fetchedBooks) throw new Error ("Book not found")
                setBook(fetchedBooks)
        }).catch(err => {
            console.error('Error fetching books :' , err)
            setBook(null)
        })
        
    },[params.bookId])

    if(!book) return <div>Loading...</div>

    return(
        <div className="book-details">
            <h2>{book.title}</h2>
            <p>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</p>
            <Link to="/book">Back to Book List</Link>
        </div>
    )
}