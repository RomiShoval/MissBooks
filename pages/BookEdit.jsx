import { bookService } from "../services/bookService.js";
import "../assets/style/pages/BookEdit.css"

const { useState, useEffect } = React
const { useParams, Link,useNavigate } = ReactRouterDOM

export function BookEdit(){
    const[bookToEdit,setBookToEdit] = useState(bookService.getEmptyBook())
    
    const { bookId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (bookId) loadBook()
    }, [bookId])

    function loadBook() {
        bookService.get(bookId)
            .then(setBookToEdit)
            .catch(err => {
                console.log('Cannot load book:', err)
            })
    }

    function handleChangeListPrice({ target }) {
        let value = target.value;
        if (value !== "") {
            value = value.replace(/^0+/, ''); 
        }
        setBookToEdit(prevBook => ({
            ...prevBook,
            listPrice: {...prevBook.listPrice,amount: value === "" ? "" : Number(value)}
        }));
    }


    function handleChange(ev){
        const { name :field, value } = ev.target;
        setBookToEdit(prevBook => ({...prevBook,[field]: value}));
    }


    function onSaveBook(ev){
        ev.preventDefault()
        bookService.save(bookToEdit)
        .then(bookToSave =>{
            console.log(`Book (${bookToSave.id}) Saved!`)
        })
        .catch(err => {
            console.log('Cannot save book:', err)
        })
        .finally(() => navigate('/book'))
    }

    return (
        <div className="book-edit">
            <h2>{bookId ? 'Edit' : 'Add'} Book</h2>
            <form onSubmit={onSaveBook}>
                <label>Title:</label>
                <input 
                    name="title" 
                    value={bookToEdit.title} 
                    onChange={handleChange} />
                    <br></br>
                <label>Price:</label>
                <input 
                    name="listPrice.amount" 
                    type="number" 
                    value={bookToEdit.listPrice.amount || 0} 
                    onChange={handleChangeListPrice} />
                    <section>
                    <button type="submit">Save</button>
                    <button type="button" className="back-btn" ><Link to="/book">Back</Link></button>
                    </section>
            </form>
        </div>
    );
}