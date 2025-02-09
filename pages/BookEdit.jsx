import { bookService } from "../services/bookService.js";
import "../assets/style/pages/BookEdit.css"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookEdit(){
    const[bookToEdit,setBookToEdit] = useState(bookService.getEmptyBook())
    // const [isLoading, setIsLoading] = useState(false)

    // const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [bookId])

    function loadBook() {
        // setIsLoading(true)
        bookService.get(bookId)
            .then(setBookToEdit)
            .catch(err => {
                console.log('Cannot load book:', err)
            })
            // .finally(() => setIsLoading(false))
    }

    function handleChangeListPrice({ target }) {
        const { value } = target;
        setBookToEdit(prevBook => ({
            ...prevBook,
            listPrice: {...prevBook.listPrice,amount: Number(value) || 0}
        }));
    }


    function handleChange(ev){
        const { name :field, value } = ev.target;


        setBookToEdit(prevBook => ({...prevBook,[field]: value}));
        // const { name :field, value } = target
        // console.log("🔍 handleChange triggered: ", field, value)
        // // if(target.type === 'number'){
        // //     value = Number(value)
        // // }
        // setBookToEdit((prevBook) =>({...prevBook,[field] : value}))
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
            <h2>{bookId ? 'Edit' : 'Add'}Book</h2>
            <form onSubmit={onSaveBook}>
                <label>Title:</label>
                <input 
                    name="title" 
                    value={bookToEdit.title} 
                    onChange={handleChange} />
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