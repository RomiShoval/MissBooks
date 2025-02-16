import { bookService } from "../services/bookService.js";
import "../assets/style/pages/BookDetails.css"
const { useEffect, useState } = React
const { useParams, Link } = ReactRouterDOM
import { LongTxt } from "../cmps/LongTxt.jsx";

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

    const getReadingLevel = (pageCount) =>{
        if(pageCount > 500) return "📖 Serious Reading"
        if(pageCount > 200) return "📘 Descent Reading"
        if(pageCount < 100) return "📗 Light Reading"
    }

    const getStylePublishDate = (publishedDate) =>{
        if((new Date().getFullYear()) - publishedDate > 10) return "Vintage"
        if((new Date().getFullYear()) - publishedDate < 1) return "New"
        else return ""
    }

    const getPriceClass = (amount) => {
        if (amount > 150) return "price-high";  // Red
        if (amount < 20) return "price-low";   // Green
        return "price-normal"; // Default
    }

    function onDeleteReview(reviewIndex){
        bookService.deleteReview(book.id,reviewIndex)
            .then(updatedBook =>{
                console.log(`succseed to remove the review`)
                setBook(updatedBook)
            })
            .catch(err => console.error("Error deleting review:",err))
    }

    if(!book) return <div>Loading...</div>

    return(
        <div className="book-details">
            <h2>{book.title}</h2>
            <h4>{book.subtitle}</h4>
            {book.listPrice.isOnSale && <div className="on-sale-sign">🔥 ON SALE 🔥</div>}
            <p><strong>Author(s):</strong> {book.authors.join(", ")}</p>
            <p><strong>Published Date:</strong> {book.publishedDate}<span>({getStylePublishDate(book.publishedDate)})</span></p>
            <p><strong>Description:</strong><LongTxt txt ={book.description} length={150}/> {book.description}</p>
            <p><strong>Page Count:</strong> {book.pageCount} <span className="reading-level">({getReadingLevel(book.pageCount)})</span></p>
            <p><strong>Categories:</strong> {book.categories.join(", ")}</p>
            <p><strong>Language:</strong> {book.language}</p>
            <p><strong>Price:</strong> <span className={getPriceClass(book.listPrice.amount)}>{book.listPrice.amount} {book.listPrice.currencyCode}</span></p>
            <img src={book.thumbnail} alt={book.title} className="book-thumbnail"/>
            <br/>
            <h3>Reviews :</h3>
            {book.reviews && book.reviews.length > 0 ?  (
                <ul className="review-list">
                    {book.reviews.map((review , index) =>(
                        <li key={index} className="review-item">
                            <p><strong>Name:</strong>{review.fullName}</p>
                            <p><strong>Reting:</strong>{review.rateBook}</p>
                            <p><strong>Read At:</strong>{review.readAt}</p>
                            <button className="delete-review-btn" onClick={() => onDeleteReview(index)}>🗑️ Delete Review</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reviews for this book</p>
            )}
            <section>
                <button ><Link to={`/book/${book.prevBookId}`}>Prev Book</Link></button>
                <button ><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
                <button><Link to = {`/book/${book.id}/addreview`}>Add Review</Link></button>
            </section>
            <Link to="/book" className="back-btn">⬅ Back to Book List</Link>
        </div>
    )
}