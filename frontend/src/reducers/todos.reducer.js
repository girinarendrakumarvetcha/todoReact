import { todoConstants } from '../constants';
import { priorityList } from './constantdropdowns';
const initialState = {
    loading : false,
    items: [],
    error:'',
    no_data_msg : 'Please select User to display data',
    message : '',
    priority_list : priorityList,
    admin_messages : []
}

export function todos(state = initialState, action) {
    switch (action.type) {
        case todoConstants.GET_USERTODO_REQUEST:
            return {
                ...state,
                loading: true
            };
        case todoConstants.GET_USERTODO_SUCCESS:
            return {
                ...state,
                items: action.data.data,
                loading:false,
                no_data_msg : (action.data.data.length) ? '': 'No Todo available..!'
            };
        case todoConstants.GET_USERTODO_FAILURE:
            return {
                ...state,
                error: action.error,
                loading:false,
                //no_data_msg : (action.todos.length) ? '': 'No Todo available..!'
            };
        case todoConstants.ADD_USERTODO_REQUEST:
            return {
                ...state,
                loading: true
            };
        case todoConstants.ADD_USERTODO_SUCCESS:
            return {
                    ...state,
                    items:  [...state.items,action.data.data],
                    loading: false,
                    message:action.message
                };
        case todoConstants.ADD_USERTODO_FAILURE:
            return {
                ...state,
                message:action.message
            };    
        case todoConstants.UPDATE_USERTODO_REQUEST:
            return {
                ...state,
                loading: true
            };
        case todoConstants.UPDATE_USERTODO_SUCCESS:
            
            return {
                    ...state,
                    items:  state.items.map(todo => {
                                if (todo.id === action.data.data.id) {
                                    todo.status = action.data.data.status    
                                }
                                return todo;
                            }),
                            loading: false,
                    message : action.data.message
                };
        case todoConstants.UPDATE_USERTODO_FAILURE:
            return {
                ...state,
                message : action.data.message
            };    
        case todoConstants.CLEAR:
            return {
                ...state,
                message:''
            }; 
        case todoConstants.CLEARTODOS:
            return {
                ...state,
                items : [],
                no_data_msg : 'Please select User to display data',
            };    
        case todoConstants.ADMIN_ACTIVITY_LIST:    
        return {
                ...state,
                admin_messages : [...state.admin_messages,action.message]                
            };    
        default:
            return state
    }
}