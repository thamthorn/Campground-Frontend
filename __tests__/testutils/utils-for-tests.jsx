import React from "react";
import { render } from '@testing-library/react'
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { bookSlice } from '@/redux/features/bookSlice'

export function renderWithProviders(
    ui,
    {
      preloadedState = { bookSlice: {bookItems: [ {
        name: "David",
        surname: "Smith",
        id: "2661876316064",
        hospital: "Thammasat",
        bookDate: "2024/08/30"
      }, {
        name: "Jane",
        surname: "Adison",
        id: "1528420999915",
        hospital: "Rajavithi",
        bookDate: "2024/06/18"
      }]}},
      store = configureStore({
        reducer: { bookSlice: bookSlice.reducer }, preloadedState
      }),
      ...renderOptions
    } = {}
  ) {
      function Wrapper({ children }){
        return <Provider store={store}>{children}</Provider>
      }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}