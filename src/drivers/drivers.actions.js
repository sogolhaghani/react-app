import { requestGetOptions, handleResponse, requestOptions, requestDeleteOptions } from '../common/actions.utils';

export const HEAD_CELL_DATA = 'DRIVERS_HEAD_CELL_DATA';
export const SORT = 'DRIVERS_SORT';
export const PAGE = 'DRIVERS_PAGE';
export const TABLE_DATA = 'DRIVERS_TABLE_DATA';
export const ENTITY_DATA = 'DRIVERS_ENTITY_DATA';
export const LOAD_MESSAGES = 'DRIVERS_LOAD_MESSAGES';
export const SAVE_OR_UPDATE_SUCCESS = 'DRIVERS_SAVE_OR_UPDATE_SUCCESS';
export const REQUIRED_VALIDATION = 'DRIVERS_REQUIRED_VALIDATION';
export const INPUT_CHANGE_VALUE = 'DRIVERS_INPUT_CHANGE_VALUE';
export const CREATE_ENTITY = 'DRIVERS_CREATE_ENTITY';
export const DELETE_SUCCESS = 'DRIVERS_DELETE_SUCCESS';
export const VALIDATION = 'DRIVERS_VALIDATION';
export const READ_VALIDATION = 'DRIVERS_READ_VALIDATION';

export const handleReadValidation = (index) => {
    return {
        type : READ_VALIDATION, index
    }
}

const addValidation = (error) => {
    return {
        type: VALIDATION , error
    }
}

export const loadHeadCells = () => {
    return {
        type: HEAD_CELL_DATA
    }
}

export const handleRequestSort = (property) => {
    return {
        type: SORT, property
    }

}

export const setPage = (page) => {
    return {
        type: PAGE, page
    }

}

export const loadMessages = () => {
    return {
        type: LOAD_MESSAGES
    }
};



export const deleteEntities = (ids) => {
    return (dispatch, getState) => {
        for (const id in ids) {
            fetch('http://localhost:8080/api/drivers/'+ids[id], requestDeleteOptions())
                .then(handleResponse)
                .then(id == ids.length -1 ? dispatch(deleteEntitiesSuccess()) : "")
                .catch((error) =>  dispatch(addValidation(error)));
        }
    }
}

export const loadDataTable = (urlParam='') => {
    return (dispatch, getState) => {
        return fetch('http://localhost:8080/api/drivers'+urlParam, requestGetOptions())
            .then(handleResponse)
            .then(list => dispatch(loadDataTableSuccess(list)))
            .catch((error) =>  dispatch(addValidation(error)));

    }

}

export const loadEntity = (id) => {
    return (dispatch, getState) => {
        return fetch('http://localhost:8080/api/drivers/' + id, requestGetOptions())
            .then(handleResponse)
            .then(entity => dispatch(loadEntitySuccess(entity)))
            .catch((error) =>  dispatch(addValidation(error)));
    }
}

export const saveOrUpdate = () => {
    return (dispatch, getState) => {
        dispatch(validateEntity());
        if (getState().drivers.validations.length == 0) {
            const method = (getState().drivers.entity.id || getState().drivers.entity.id > 0) ? 'PUT' : 'POST';
            getState().drivers.entity.modelId = getState().base.action.value
            const param = requestOptions(method, getState().drivers.entity);
            fetch('http://localhost:8080/api/drivers', param)
                .then(handleResponse)
                .then(response => dispatch(saveEntitySuccess(response)))
    
                .catch((error) =>  dispatch(addValidation(error)));

        }
    };
}

const validateEntity = () => {
    return (dispatch, getState) => {
        dispatch(requiredValidation('name'))
        dispatch(requiredValidation('code'))
        dispatch(requiredValidation('unit'))
        dispatch(requiredValidation('type'))
    }
}

export const requiredValidation = (field) => {
    return {
        type: REQUIRED_VALIDATION, field
    }
}

const loadDataTableSuccess = (list) => {
    return {
        type: TABLE_DATA, list
    }
}

const loadEntitySuccess = (entity) => {
    return {
        type: ENTITY_DATA, entity
    }
}

const saveEntitySuccess = (response) => {
    return {
        type: SAVE_OR_UPDATE_SUCCESS, response
    }
}

export const inputChangeHandler = (value, field) => {
    return {
        type: INPUT_CHANGE_VALUE, field, value
    }
}

export const createEntity = () => {
    return {
        type: CREATE_ENTITY
    }
}

export const deleteEntitiesSuccess = () => {
    return {
        type : DELETE_SUCCESS
    }
}
