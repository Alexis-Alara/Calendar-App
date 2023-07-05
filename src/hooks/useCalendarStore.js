import { useSelector, useDispatch } from "react-redux"
import { onAddNewEvent, onSetActiveEvent } from "../store"

export const useCalendarStore = () => {

     const dispatch = useDispatch()

    const { events, activeEvent } = useSelector(state => state.calendar)

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }
    const startSavingEvent = async ( calendarEvent )=> {
        //TODO send to backend

        if( calendarEvent.id ) {
            //Update
        } else {
            //Create
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) )
        }
    }

    return {
        events,
        activeEvent,
        setActiveEvent,
        startSavingEvent
    }
}

