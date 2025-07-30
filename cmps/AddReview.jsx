const { useState , useEffect } = React
const { useParams, Link,useNavigate } = ReactRouterDOM
import { bookService } from "../services/bookService.js";

export function AddReview(){
    const { bookId } = useParams()
    const navigate = useNavigate()
    const[review , setReview] = useState({
        fullName:"",
        rateBook : 3,
        readAt:""
    })

    function handleChange(ev){
        const { name , value } = ev.target;
        setReview(prevReview => ({...prevReview, [name]: value}));
    }

    function onAddReview(ev){
            ev.preventDefault()
            bookService.addReview(bookId,review)
            .then(bookToSave =>{
                console.log(`Book review (${bookToSave.id}) Saved!`)
            })
            .catch(err => {
                console.log('Cannot save book review:', err)
            })
            .finally(() => navigate('/book'))
        }
    
    
    return(
        <div className="book review">
            <h2>Review Book</h2>
            <form onSubmit={onAddReview}>
                <label>Full Name:</label>
                <input 
                    name="fullName" 
                    value={review.fullName}
                    onChange={handleChange} 
                />
                <br></br>
                <label>Rate book :</label>
                <input
                    type = "range"
                    name = "rateBook"
                    id="rate"
                    min = "0"
                    max="5"
                    value={review.rateBook}
                    onChange={handleChange} 
                />
                <br></br>
                <label>Read At</label>
                <input
                    type="date"
                    id="date"
                    name = "readAt"
                    value={review.readAt}
                    onChange={handleChange} 
                />
            <section>
                <button type="submit">Save</button>
                <button type="button" className="back-btn" ><Link to="/book">Back</Link></button>
                </section>
            </form>
        </div>
    )
}