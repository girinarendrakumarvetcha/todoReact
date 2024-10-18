import { registrationConstants } from '../constants';
import { history } from '../helpers';
import apis from '../api';
export const registrationActions = {
    register
};

function register(user) {
    return dispatch => {

        dispatch(request());
        return apis.userRegistration(user).then((result) => {
            const response = result.data;
            if(!response.success){
                dispatch(failure(response.message));
            }else{
                dispatch(success(response.data));
                history.push('/login');
                window.location.reload();
            }
        });
        
    };

    function request() { return { type: registrationConstants.REGISTER_REQUEST } }
    function success(user) { return { type: registrationConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: registrationConstants.REGISTER_FAILURE, error } }
}
