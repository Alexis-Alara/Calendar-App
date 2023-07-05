
import { createSlice } from "@reduxjs/toolkit"
import { addHours } from "date-fns";

const tempEvent = {
    title: 'Cumpleaños de James Cameron',
    notes: 'Hay que comprar pastel',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Alex'
    }
  }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null
    },
    reducers: {
        on: ( state ) => {
            console.log(state)
        },
    }
});

export const { on } = calendarSlice.actions
