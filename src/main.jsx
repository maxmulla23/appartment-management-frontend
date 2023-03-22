import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { store } from './app/store'
import axios from 'axios'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'

axios.defaults.baseURL = 'http://localhost:4001/'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
