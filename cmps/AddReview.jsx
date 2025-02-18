const { useState , useEffect } = React
const { useParams, Link,useNavigate } = ReactRouterDOM
import { bookService } from "../../../services/bookService.js";
import "../assets/style/cmps/AddReview.css"

export function AddReview(){
    const { bookId } = useParams()
    const navigate = useNavigate()
    const[review , setReview] = useState({
        fullName:"",
        rateBook : 3,
        readAt:""
    })

    const [ratingType, setRatingType] = useState("rateBySelect")

    function handleChange(ev){
        const { name , value } = ev.target;
        setReview(prevReview => ({...prevReview, [name]: value}));
    }

    function handleRatingChange(newValue){
        setReview((prevReview) =>({...prevReview, rateBook:newValue}))
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

    function DynamicCmp({ratingType,val,onRateChange}) {
        switch (ratingType) {
            case 'rateBySelect':
                return <RateBySelect val={val} onRateChange={onRateChange} />
            case 'rateByTextBox':
                return <RateByTextBox val={val} onRateChange={onRateChange} />
            case 'rateByStars':
                return <RateByStars val={val} onRateChange={onRateChange}/>
            default:
                return null
        }
    }

    function RateBySelect({val,onRateChange}){
        return(
            <div>
                <label>Rate By Select:</label>
                <select value={val} onChange={(e) => onRateChange(Number(e.target.value))}>
                    {[...Array(6).keys()].map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
            </div>
        )
    }

    function RateByTextBox({val,onRateChange}){
        return(
            <div>
                <label>Rate By TextBox:</label>
                <input
                    type = "number"        
                    min = "0"
                    max="5"
                    value={val}
                    onChange={(e) => onRateChange(Number(e.target.value))} 
                />
        
            </div>
        )    
    }

    function RateByStars({val,onRateChange}){
        return(
          <div>
            <label>Rate By Stars:</label>
            {[...Array(5)].map((_, index) => (
                    <span
                        key={index}
                        onClick={() => onRateChange(index + 1)}
                        style={{ cursor: "pointer", color: index < val ? "gold" : "gray" }}
                    >
                        ★
                    </span>
                ))}
          </div>
        )
    }

    
    return(
        <div className="add-review">
            <h2>Review Book</h2>
            <form onSubmit={onAddReview}>
                <label>Full Name:</label>
                <input 
                    name="fullName" 
                    value={review.fullName}
                    onChange={handleChange} 
                />
                <br></br>
                <fieldset>
                    <legend>Choose Rating Method:</legend>
                    <label>
                    Select
                        <input
                            type="radio"
                            name="ratingType"
                            value="rateBySelect"
                            checked={ratingType === "rateBySelect"}
                            onChange={() => setRatingType("rateBySelect")}
                        /> 
                    </label>
                    <label>
                    Textbox
                        <input
                            type="radio"
                            name="ratingType"
                            value="rateByTextBox"
                            checked={ratingType === "rateByTextBox"}
                            onChange={() => setRatingType("rateByTextBox")}
                        />
                    </label>
                    <label>
                    Stars
                        <input
                            type="radio"
                            name="ratingType"
                            value="rateByStars"
                            checked={ratingType === "rateByStars"}
                            onChange={() => setRatingType("rateByStars")}
                        />
                    </label>
                </fieldset>
                 <section className="dynamic-cmps">
                <DynamicCmp ratingType={ratingType} val = {review.rateBook} onRateChange={handleRatingChange}/>
            </section>
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