function eventListenerEmmiter () {
    const listenerMap ={}
    return {
        on(eventName , listener) {
            listenerMap[eventName] = listenerMap[eventName] ? [...listenerMap[eventName],listener] : [listener]
            return () =>{
                listenerMap[eventName] = listenerMap[eventName].filter((func) => func !== listener)
            }
        },

        emit(eventName,data){
            if(!listenerMap[eventName]) return
            listenerMap[eventName].forEach(listener => listener(data));
        }       
    }
}



export const eventBusService = eventListenerEmmiter()
// window.evBus = eventBusService

function sendMsg(msg){
    eventBusService.emit('show-user-msg' , msg)
}

export function sendSuccsessMsg(txt){
    sendMsg({txt , type:'success'})
}


export function sendErrorMsg(txt){
    sendMsg({txt , type:'error'})
}

// window.sendSuccsessMsg = sendSuccsessMsg
// window.sendErrorMsg = sendErrorMsg