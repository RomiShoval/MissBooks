import {BookPreview} from "./BookPreview.jsx";
import '../assets/style/cmps/BookList.css';
const { Link } = ReactRouterDOM

export function BookList({ books ,onRemoveBook }) {
    return (
        <ul className="book-list">
            {books.length === 0 ? (
                <p>No books found.</p>
            ) :(
            books.map(book => (
                <li key={book.id} className="book-card">
                    <img src={book.thumbnail} alt={book.title} />
                    <BookPreview book={book} />
                    <section className="book-actions">
                        <button className="delete-btn" onClick={() => onRemoveBook(book.id)}> Remove</button>
                        <button><Link to={`/book/${book.id}`}>Details</Link></button>
                        <button><Link to={`/book/edit/${book.id}`}>Edit</Link></button>
                    </section>
                </li>)
            ))}
        </ul>
    );
}

