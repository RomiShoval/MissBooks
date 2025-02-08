import { bookService } from "../services/bookService.js";
import "../assets/style/pages/BookEdit.css"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookEdit(){
    const[book,setBook] = useState(bookService.getEmptyBook())


    function handleChange(target){
        const {name,value} = target;
        setBook(prevBook => ({...prevBook,[name]:value}))
    }

    function handleSubmit(event){
        event.preventDefault()
        bookService.save(book).then(()=>alert("book saved!"))
    }
    return (
        <div className="book-edit">
            <h2>Edit Book</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input name="title" value={book.title} onChange={handleChange} />

                <label>Price:</label>
                <input name="listPrice.amount" type="number" value={book.listPrice.amount} onChange={handleChange} />

                <button type="submit">Save</button>
            </form>
        </div>
    );
}