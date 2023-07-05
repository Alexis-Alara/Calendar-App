import { useState } from 'react'

import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete  } from "../"
import { localizer, getMessages } from '../../helpers'
import { useCalendarStore, useUiStore } from '../../hooks'



export const CalendarPage = () => {

  const { openDateModal } = useUiStore()
  const { events, setActiveEvent } = useCalendarStore()

  const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = () => {
    openDateModal()
  }
  
  const onSelect = ( event ) => {
    setActiveEvent( event )
  }
  
  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event)
    setlastView( event )
  }

  return (
    <>
      <Navbar/>
      
      <Calendar
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessages() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />

    </>
  )
}
