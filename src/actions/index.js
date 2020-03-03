import axios from 'axios'
import { GET_CURRENCY, APP_ERROR, GET_RATE } from './types'


//get currencies
export const getCurrency = () => async dispatch => {
    try {

        const res = await axios.get('https://gist.githubusercontent.com/mddenton/062fa4caf150bdf845994fc7a3533f74/raw/27beff3509eff0d2690e593336179d4ccda530c2/Common-Currency.json')

        const cur = Object.values(res.data)

        dispatch({
            type: GET_CURRENCY,
            payload: cur
        })
        
    } catch (err) {
        dispatch({
            type: APP_ERROR,
            payload: { msg: "An Error Occured"}
        })
    }
}


//get rates
export const getRates = () => async dispatch => {
    try {
        
        const res = await axios.get('http://data.fixer.io/api/latest?access_key=98be3f3b94b3c708816f9b63152b88f8')
        
        dispatch({
            type: GET_RATE,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: APP_ERROR,
            payload: { msg: "An Error Occured"}
        })
    }
}