import apis from '../api';
import { authenticationConstants } from '../constants';
import { history } from '../helpers';



export const authenticationActions = {
    login,
    logout
};


function login(username, password, from) {
    return dispatch => {
        dispatch(request());
        return apis.userLogin({username,password}).then((result) => {
            const response = result.data;
            if(!response.success){
                dispatch(failure(response.message));
            }else{
                const user = response.data;
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', JSON.stringify(response.token));
                dispatch(success(user));
                if(typeof user.usertype != 'undefined' && user.usertype === 'user'){
                    from = '/user/user';
                }else if(typeof user.usertype != 'undefined' && user.usertype === 'admin'){
                    from = '/user/admin';
                }
                history.push(from);
                window.location.reload();
            }
        });
    };

    function request() { return { type: authenticationConstants.LOGIN_REQUEST } }
    function success(user) { return { type: authenticationConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: authenticationConstants.LOGIN_FAILURE, error } }
}

function logout() {
    localStorage.removeItem('user');
    return { type: authenticationConstants.LOGOUT };
}