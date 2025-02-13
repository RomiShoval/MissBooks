const { useState , useEffect} = React
import { eventBusService } from "../services/eventBusService.js"
import "../assets/style/cmps/UserMsg.css"

export function UserMsg(){
    const [message , setMessage] = useState(null)

    useEffect(()=>{
        const unsbscribe = eventBusService.on('show-user-msg',message => {
            setMessage(message)
        })
        return unsbscribe
    },[])

    function onCloseMsg(){
        setMessage(null)
    }

    if(!message) return null
    return(
        <section className={`user-msg ${message.type ? message.type : ''}`}>
            <h4>{message.txt}</h4>
            <button onClick={onCloseMsg} className="delete-btn">X</button>
        </section>
    )
}