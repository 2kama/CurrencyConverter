import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

//components

import CurrencyConverter from './CurrencyConverter'
import reducers from './reducers/'


const store = createStore(
    reducers,
    applyMiddleware(reduxThunk)
)


ReactDOM.render(
    <Provider store={store}>
         <CurrencyConverter/>
    </Provider>
    , document.querySelector("#root")
)