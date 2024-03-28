import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interface";
// import { BookingItem } from "../../../interface"

type BookState = {
    bookItems: BookingItem[]
}

const initialState: BookState = { bookItems: [] }

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        addBooking: (state, action: PayloadAction<BookingItem>) => {
            const newBooking = action.payload;
            const existingBookingIndex = state.bookItems.findIndex(item => item._id === newBooking._id);
            if (existingBookingIndex !== -1) {
                // If booking with the same user already exists, replace it
                state.bookItems.splice(existingBookingIndex, 1, newBooking);
            } else {
                // Otherwise, add the new booking
                state.bookItems.push(newBooking);
            }
        },
        removeBooking: (state, action: PayloadAction<string>) => {
            const userIdToRemove = action.payload;
            state.bookItems = state.bookItems.filter(item => item._id !== userIdToRemove);
        }
    }
})

export const { addBooking, removeBooking } = bookSlice.actions
export default bookSlice.reducer