import { userConstants } from '../constants';
const initialState = {
    loading : false,
    items: [],
    error:''
}
export function users(state = initialState, action) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userConstants.GETALL_SUCCESS:
            return {
                ...state,
                items: action.data.data,
                loading: false
            };
        case userConstants.GETALL_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case userConstants.DELETE_REQUEST:
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case userConstants.DELETE_SUCCESS:
            return {
                ...state,
                items: state.items.filter(user => user.id !== action.id)
            };
        case userConstants.DELETE_FAILURE:
            
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.id) {
                       
                        const { deleting, ...userCopy } = user;
                       
                        return { ...userCopy, deleteError: action.error };
                    }

                    return user;
                })
            };
        default:
            return state
    }
}