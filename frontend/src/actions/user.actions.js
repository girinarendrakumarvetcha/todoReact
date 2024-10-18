import { userConstants } from '../constants';
import { authHeader } from '../helpers';
import apis from '../api';
export const userActions = {
        getAllUserList
};

function getAllUserList() {
    return dispatch => {
        const requestOptions = {
            headers: authHeader()
        };
        dispatch(request());
        return apis.allUserList(requestOptions).then(result => {
            
            const response = result.data;
            if(!response.success){
                dispatch(failure(response.message));
            }else{
                dispatch(success(response));
              
            }

        });
    
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(data) {return { type: userConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}
