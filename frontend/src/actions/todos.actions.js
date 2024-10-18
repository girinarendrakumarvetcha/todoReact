import apis from '../api';
import { todoConstants } from '../constants';
import { authHeader } from '../helpers';
import socketClient  from "socket.io-client";
const SERVER = 'http://'+window.location.hostname+':8000';
var socket = socketClient (SERVER);
export const todosActions = {
    addUserTodo,
    getUserTodoList,
    updateUserTodoStatus,
    clear,
    clearTodos,
    updateAdminTodoList
};


function getUserTodoList(id) {
    return dispatch => {
        const requestOptions = {
            headers: authHeader()
        };
        dispatch(request());
        apis.userTodoList(id,requestOptions).then(result => {            
            const response = result.data;
            if(!response.success){
                dispatch(failure(response.message));
            }else{
                dispatch(success(response));
              
            }
        });
    };

    function request() { return { type: todoConstants.GET_USERTODO_REQUEST } }
    function success(data) {return { type: todoConstants.GET_USERTODO_SUCCESS, data } }
    function failure(error) { return { type: todoConstants.GET_USERTODO_FAILURE, error } }
}

function addUserTodo(todo,admin_msg) {
    return dispatch => {
        const requestOptions = {
            headers: authHeader()
        };
        dispatch(request());
        apis.todoAdd(todo,requestOptions).then(result => {
            const response = result.data;

            if(!response.success){
                dispatch(failure(response.message));
            }else{
                dispatch(success(response));
                socket.emit('activity_log',admin_msg);
            }
        });
        
    };

    function request() { return { type: todoConstants.ADD_USERTODO_REQUEST } }
    function success(data) {return { type: todoConstants.ADD_USERTODO_SUCCESS, data } }
    function failure(error) { return { type: todoConstants.ADD_USERTODO_FAILURE, error } }
}

function updateUserTodoStatus(todo,admin_msg) {
    return dispatch => {
        const requestOptions = {
            headers: authHeader()
        };
        dispatch(request());
        apis.updateUserTodoStatus(todo,requestOptions).then(result => {
            const response = result.data;
            if(!response.success){
                dispatch(failure(response.message));
            }else{
                dispatch(success(response));
                socket.emit('activity_log',admin_msg);
            } 
        });
    };

    function request() { return { type: todoConstants.UPDATE_USERTODO_REQUEST } }
    function success(data) {return { type: todoConstants.UPDATE_USERTODO_SUCCESS, data } }
    function failure(error) { return { type: todoConstants.UPDATE_USERTODO_FAILURE, error } }
}

function clear() {
    return { type: todoConstants.CLEAR };
}
function clearTodos() {
    return { type: todoConstants.CLEARTODOS };
}
function updateAdminTodoList(message) {
    return { type: todoConstants.ADMIN_ACTIVITY_LIST,message };
}