import React from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import Router from './Navigation/Router'
import store from './state'

function App() {
  return (
    <div>
      <ToastContainer />
      <Provider store={store}>
        <Router />
      </Provider>
    </div>
  )
}

export default App
