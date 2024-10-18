import { registrationConstants } from '../constants';
import { userType } from './constantdropdowns';
const initialState = {
    registering : false,
    usertype: userType,
    message: '',
    type: '',
}

export function registration(state = initialState, action) {
    switch (action.type) {
        case registrationConstants.REGISTER_REQUEST:
            return { 
                ...state,
                registering: true,
                type: 'alert-secondary',
             };
        case registrationConstants.REGISTER_SUCCESS:
            return { 
                ...state,
                registering: false,
                type: 'alert-success',
                message: action.message 
            };
        case registrationConstants.REGISTER_FAILURE:
        return { 
                ...state,
                registering: false,
                message: action.error,
                type: 'alert-danger',
            };
        case registrationConstants.REGISTER_USER_TYPE:
                return { 
                    ...state,
                    usertype: action.payload
                };    
        default:
            return state
    }
}