import {CREATE_USER} from '../actions/types';

const initialState = {
    userId : 'ahmed'
}

export const userReducer = (state = initialState, action) => {
   console.log(action)
   console.log("the payload is "+ action.payload)
    switch(action.type){
    case 'CREATE_USER':
            console.log('in the action yeah')
            return {
                ...state,
                userId: action.payload,
            };
    default:
        console.log('defauly')
        return state;
    }
}