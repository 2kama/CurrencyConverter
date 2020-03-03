import { GET_CURRENCY, APP_ERROR, GET_RATE } from '../actions/types'



export default function(state={}, action) {
    const { type, payload } = action
    switch (type) {

        case GET_CURRENCY:
            return {
                ...state,
                currencies : payload
            };

        case GET_RATE:
            return {
                ...state,
                rates : payload
            }

        case APP_ERROR:
            return {
                ...state,
                appError : payload
            };
        
        default:
            return state

    }
}