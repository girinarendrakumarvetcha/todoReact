import { authenticationConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
let token = JSON.parse(localStorage.getItem('token'));

const initialState = (user && token )? { loggedIn: true , loggingIn: false , user ,message:'',type: '' } : {loggingIn: false , loggedIn:false,user:{},message:'',type: ''};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case authenticationConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                loggedIn: false,
                user : {},
                type: 'alert-secondary',
                message:''
            };
        case authenticationConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                loggingIn: false,
                user: action.user,
                type: 'alert-success',
                message:''
            };
        case authenticationConstants.LOGIN_FAILURE:
             
        return {
                
                loggedIn: false,
                loggingIn: false,
                type: 'alert-danger',
                user : {},
                message: action.error
            };
        case authenticationConstants.LOGOUT:
            return {
                loggedIn: false,
                loggingIn: false,
                type: 'alert-success',
                user : {},
                message:''
            };
        default:
            return state
    }
}