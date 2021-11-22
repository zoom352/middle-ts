import { EventAction, EventActionEnum, EventState } from "./types"



const initialState: EventState = {
    events: [],
    guests: []
}


const EventReducer = (state = initialState, action: EventAction):EventState => {

    switch(action.type){
        case EventActionEnum.SET_GUESTS:
            return {...state, guests: action.payload}
        case EventActionEnum.SET_EVENTS:
            return {...state, events: action.payload}
        
        default:
            return state
    }
}


export default EventReducer;