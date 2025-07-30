const { useState } = React
import "../assets/style/cmps/LongTxt.css"

export function LongTxt({ txt, length = 100 }){
    const[isExpanded , setIsExpended] = useState(false)

    const toggleExpand = () =>{
        setIsExpended(prev => !prev)
    }

    return(
        <div>
            {isExpanded ? txt : txt.slice(0, length) + (txt.length > length ? "..." : "")}
            {txt.length > length && (
                <button onClick={toggleExpand} className="toggle-btn">
                    {isExpanded ? "Read Less" : "Read More"}
                </button>
            )}
        </div>
    )
}