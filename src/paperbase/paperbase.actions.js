import { requestGetOptions, handleResponse, requestOptions, requestDeleteOptions } from '../common/actions.utils'
export const LOAD_MESSAGES = 'BASE_LOAD_MESSAGES';
export const CLEAR_ACTION = 'BASE_CLEAR_ACTION';

export const loadMessages = () => {
    return {
        type: LOAD_MESSAGES
    }
};

export const finilize = (id, value) => {
    return (dispatch, getState) => {
        const serverURL = id == 'models' ? 'http//localhost:8080/scenario-models/finalize/'+value : '';
        return fetch(serverURL, requestGetOptions())
            .then(handleResponse)
    }
}

export const clearAction = () => {
    return{
        type: CLEAR_ACTION
    }
}