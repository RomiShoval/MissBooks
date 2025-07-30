const { Link } = ReactRouterDOM
import '../assets/style/cmps/BookPreview.css';

export function BookPreview({ book }) {
    return (
        <div className="book-preview">
            <h3>{book.title}</h3>
            <p>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</p>
            <Link to={`/book/${book.id}`}>View Details</Link>
        </div>
    );
}



