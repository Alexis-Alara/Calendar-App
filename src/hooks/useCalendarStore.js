import { useSelector, useDispatch } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store"

export const useCalendarStore = () => {

     const dispatch = useDispatch()

    const { events, activeEvent } = useSelector(state => state.calendar)

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }
    const startSavingEvent = async ( calendarEvent )=> {
        //TODO send to backend

        if( calendarEvent._id ) {
            //Update
            dispatch( onUpdateEvent({ ...calendarEvent }) )
        } else {
            //Create
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) )
        }
    }
    const startDeletingEvent = async() =>{
        //TODO arrive to backend
        dispatch( onDeleteEvent() )
    }

    return {
        //props
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        //methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    }
}

