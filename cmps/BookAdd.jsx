const { useState , useEffect,useRef } = React
const { useParams, Link,useNavigate } = ReactRouterDOM
import { bookService } from "../services/bookService.js"
import {debounce} from "../services/util.service.js"
import { googleBookService } from "../services/googleBookService.js"

export function BookAdd(){
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [addedBooks, setAddedBooks] = useState([])

    const queryDebounce = useRef(
        debounce((query) =>{
            if(!query){
                console.log("im here")
                setSearchResults([])
                return
            }

            googleBookService.query({searchTerm: query})
                .then((books) => {
                    console.log("fetched books:",books)
                    setSearchResults(books)
                    console.log(searchResults)
                })
                .catch(err => console.error("Error fetching books:",err))
        },500)
    ).current


    useEffect(() =>{
       queryDebounce(searchTerm)
       console.log(searchTerm)
       
    },[searchTerm])

    useEffect(() => {
        console.log("Updated searchResults:", searchResults);
    }, [searchResults]);

    function handleChange(ev){
        setSearchTerm(ev.target.value)
    }

    async function onAddBook(book){
        console.log("Adding Book" , book)
        bookService.addGoogleBook(book).
            then(newBook =>{
                setAddedBooks([...addedBooks,newBook])
                console.log("books added successfully")
            })
            .catch(err => console.error(`There was an error adding book`,err))
    }

    return(
        <div>
            <h2>Add new book</h2>
            <input
                type="text"
                placeholder="Search google books"
                value={searchTerm}
                onChange={handleChange}
            />
            <ul>
                {searchResults.map(book =>(
                    <li key={book.id}>
                        {book.title}
                        <button onClick={() => onAddBook(book)}>+</button>
                        </li>
                ))}
            </ul>
            <Link to="/book">⬅ Back to Book List</Link>
        </div>
    )
}