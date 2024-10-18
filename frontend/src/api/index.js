import axios from 'axios';

const api = axios.create({
    baseURL: 'http://'+window.location.hostname+':8000/api',
    //baseURL: 'http://192.168.1.2:8080/api',
})


const userLogin = ({username,password} ) => api.get(`/user/login/${username}/${password}`);
const userRegistration = (payload )=> api.post(`/user/add`,payload);

const allUserList = (headers) => api.get(`/user/userlist/`,headers);


const userTodoList = (id,headers) => api.get(`/todolist/userlist/${id}`,headers);
const todoAdd = (payload,headers) => api.post(`/todolist/add`,payload,headers);
const updateUserTodoStatus = (payload,headers) => api.put(`/todolist/update`,payload,headers);


const apis = {
    userLogin,
    allUserList,
    userRegistration,
    userTodoList,
    todoAdd,
    updateUserTodoStatus
}

export default apis;
