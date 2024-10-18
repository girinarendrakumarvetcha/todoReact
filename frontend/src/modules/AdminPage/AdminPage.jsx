import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { todosActions, userActions } from '../../actions';
import {Header,Footer} from '../Templates'

import socketClient  from "socket.io-client";
const SERVER = 'http://'+window.location.hostname+':8000';
var socket = socketClient (SERVER);
function AdminPage() {
    
    const [tododata, setTododata] = useState({
        todo_user : '',
        todo_user_name : '',
        description : '',
        priority : 'high',
        status:''
    });
    const users = useSelector(state => state.users);
    const user  = useSelector(state => state.authentication.user);    
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        
        socket.on('activity_log', (message) => {

            dispatch(todosActions.updateAdminTodoList(message));
        });

        if(user.usertype === 'admin'){
            dispatch(userActions.getAllUserList());
        }else{
            dispatch(todosActions.getUserTodoList(user.id));
        }
        
    }, []);
  
    function updateTodoStatus(e){

        if(user.usertype === 'user'){
            const todoid =  e.target.getAttribute("data-todokey");
            var status =  e.target.getAttribute("data-status");
            status = (status === 'incomplete')? 'complete': 'incomplete';
            const todo_data  = {id : todoid,status : status};
            
            let admin_msg = user.fullname + ' has updated todo status to ' + status;
            dispatch(todosActions.updateUserTodoStatus(todo_data,admin_msg));
            setTimeout(function(){
                dispatch(todosActions.clear());
            },3000);
        }
    }
    
    function handleChange(e) {
        const { name, value } = e.target;
        setTododata(tododata => ({ ...tododata, [name]: value }));
        if(name === 'todo_user'){
            let sel_user_name = '';
         
            for (const index of users.items) {
                if(index.ma_id === value){
                    sel_user_name = index.user_name;
                }
              }
            
            setTododata(tododata => ({ ...tododata, todo_user_name: sel_user_name }));
            if(value){
                dispatch(todosActions.getUserTodoList(value));
            }
            else{
                dispatch(todosActions.clearTodos());
            }
        }
    }

    function addUserTodo(){
       if(tododata.description === ''){
           alert('Please add some todo');           
       }else{
            let admin_msg = user.fullname + ' has created a todo ' + tododata.todo_user_name;
            dispatch(todosActions.addUserTodo(tododata,admin_msg));
            setTimeout(function(){
                dispatch(todosActions.clear());
            },3000);
       } 
       
    }
 
    return (
        <Fragment>
            <Header />
            <div className="container page-container">                
                <h1>Hi {user.fullname}!</h1>
                
                {users.loading && <em>Loading users...</em>}
                
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                
                <div className='container-fluid admin-user-data-container'>
                    { user.usertype === 'admin' &&     
                        <div className='user-actions-container col-md-12'>
                            <div className='user-actions-left-container panel-container col-md-6'>
                                <div className='top-contnet '>
                                    <label htmlFor='description'>Todo</label>
                                    <input type='text' className='form-control' name='description' value={tododata.description} onChange={(e) => handleChange(e)  } placeholder='Add Todo here'></input>
                                </div>
                                <div className='bottom-content form-inline'>
                                <div className='form-group'>
                                    <label htmlFor='todo-user'>User</label>
                                    {users.items && 
                                        <select name='todo_user' className='form-control' onChange={(e) => handleChange(e)}   > 
                                            <option key='0' value=''>--</option>
                                            {users.items.map((user, index) => <option value={user.ma_id} key={user.ma_id} >{user.user_name}</option> )}
                                        </select>
                                        }
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='priority'>Priority</label>
                                    <select name='priority' className='form-control'  onChange={(e) => handleChange(e) } value={tododata.priority}> 
                                        {todos.priority_list.map((item, index) => <option value={item.id} key={item.id} >{item.value}</option> )}
                                    </select>
                                </div>
                                <div className='form-group'>
                                <label htmlFor='add_todo'>Submit</label>
                                    <button type='button' className='form-control add_todo_btn' name='add_todo' disabled={(tododata.todo_user === '' || tododata.description === ''  ) && 'disabled' }  onClick={() => addUserTodo()}>Add</button>
                                </div>
                                
                            </div>
                            </div>
                            <div className='user-actions-right-container panel-container col-md-6' >
                                <div className='admin-messages-container col-md-12'>
                                    <h4>Admin Messages</h4>
                                        {todos.admin_messages && 
                                            <ul className='list-group'>
                                                {todos.admin_messages.map((todo, index) =>
                                                    <li className="list-group-item" key={index}>
                                                     {todo}       
                                                     </li> 
                                                )}   
                                            </ul>
                                        }
                                </div>
                            </div>
                        </div>    
                        }
                    <div className='container col-md-8 todo_details-actions'>
                        <div className='row'>
                            { todos.loading && 
                                <span className='text-center  alert alert-info'><em>Loading data...</em></span>
                            }
                        </div>
                        <div className='row'>
                            { todos.message && 
                               <span className='text-center alert alert-info'> <em>{todos.message}</em></span>
                            }
                            
                        </div>
                        <div className='row'> 
                            {todos.items && 
                                <ul className="list-group">         
                                    {todos.items.map((todo, index) =>
                                        <li className="list-group-item" key={todo.id}>
                                                <div className='todo-content'>
                                                    <div className='todo-content-left'>
                                                        {todo.description}
                                                    </div>
                                                    <div className='todo-content-right'>
                                                        <span className={'text-capitalize-content priority-'+ todo.priority}  >{todo.priority}</span>
                                                        
                                                        <span className='btn btn-primary todo_status text-capitalize-content'  
                                                            data-todokey={todo.id} data-status={todo.status}  onClick={(e) => updateTodoStatus(e)}>{todo.status}
                                                            </span>
                                                    </div>
                                                </div>
                                            </li> 
                                    )}                
                                </ul>
                            }
                        </div>
                        <div className='row'> 
                        
                            {todos.items.length === 0 && 
                                
                                <div className='no-data-container'>
                                    <span className='text-center  alert alert-info'> <em>{todos.no_data_msg}</em></span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </Fragment>
    );
}

export { AdminPage };

