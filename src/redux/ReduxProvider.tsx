'use client'
import { store } from "@/redux/store"
import { Provider as ReactReduxProvider } from 'react-redux'

function ReduxProvider({children} : {children: React.ReactNode}) {
  return (
    <ReactReduxProvider store={store}>
        {children}
    </ReactReduxProvider>
  )
}

export default ReduxProvider
