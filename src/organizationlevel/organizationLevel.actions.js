import { requestGetOptions, handleResponse, requestOptions, requestDeleteOptions } from '../common/actions.utils'

export const SORT = 'ORGANIZATIONLEVEL_SORT';
export const PAGE = 'ORGANIZATIONLEVEL_PAGE';
export const ROOT_DATA = 'ORGANIZATIONLEVEL_ROOT_DATA';
export const ENTITY_DATA = 'ORGANIZATIONLEVEL_ENTITY_DATA';
export const LOAD_MESSAGES = 'ORGANIZATIONLEVEL_LOAD_MESSAGES';
export const SAVE_OR_UPDATE_SUCCESS = 'ORGANIZATIONLEVEL_SAVE_OR_UPDATE_SUCCESS';
export const REQUIRED_VALIDATION = 'ORGANIZATIONLEVEL_REQUIRED_VALIDATION';
export const CLOSE_FORM = 'ORGANIZATIONLEVEL_CLOSE_FORM';
export const INPUT_CHANGE_VALUE = 'ORGANIZATIONLEVEL_INPUT_CHANGE_VALUE';
export const CREATE_ENTITY = 'ORGANIZATIONLEVEL_CREATE_ENTITY';
export const DELETE_SUCCESS = 'ORGANIZATIONLEVEL_DELETE_SUCCESS';
export const MODELID_CHANGED = 'ORGANIZATIONLEVEL_MODELID_CHANGED';
export const LOAD_CHILDREN_SUCCESS = 'ORGANIZATIONLEVEL_LOAD_CHILDREN_SUCCESS';
export const CLOSE_CHILDREN = 'ORGANIZATIONLEVEL_CLOSE_CHILDREN';
export const VALIDATION = 'ORGANIZATIONLEVEL_VALIDATION';
export const READ_VALIDATION = 'ORGANIZATIONLEVEL_READ_VALIDATION';
export const UPDATE_FILTER_LIST = 'ORGANIZATIONLEVEL_UPDATE_FILTER_LIST';

export const updateFilterList = (filterList) => {
    return {
     type : UPDATE_FILTER_LIST, filterList
    }
}

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

export const close = (id) => {
    return {
        type: CLOSE_CHILDREN, id
    }
}

export const deleteEntities = (id) => {
    return (dispatch, getState) => {
        fetch('http://localhost:8080/api/organization-levels/' + id, requestDeleteOptions())
            .then(handleResponse)
            .then(dispatch(deleteEntitiesSuccess()))
    }
}

export const loadRoots = () => {
    return (dispatch, getState) => {
        const id = getState().base.action.value
        return fetch('http://localhost:8080/api/organization-levels/roots/' + id, requestGetOptions())
            .then(handleResponse)
            .then(list => dispatch(loadRootsSuccess(list)))
            .catch((error) =>  dispatch(addValidation(error)));

    }

}

export const loadChildren = (id, level) => {
    return (dispatch, getState) => {
        const modelID = getState().base.action.value
        return fetch('http://localhost:8080/api/organization-levels/child/' +modelID+'/'+ id, requestGetOptions())
            .then(handleResponse)
            .then(list => dispatch(loadChildrenSuccess(list, id, level)))
            .catch((error) =>  dispatch(addValidation(error)));
    }
}

export const loadDataTable = () => {
    return (dispatch, getState) => {
        return fetch('http://localhost:8080/api/organization-levels', requestGetOptions())
            .then(handleResponse)
            .then(list => dispatch(loadRootsSuccess(list)))
            .catch((error) =>  dispatch(addValidation(error)));

    }

}


const loadChildrenSuccess = (list, id, level) => {
    return {
        type: LOAD_CHILDREN_SUCCESS, list, id, level
    }
}

export const loadEntity = (id) => {
    return (dispatch, getState) => {
        return fetch('http://localhost:8080/api/organization-levels/' + id, requestGetOptions())
            .then(handleResponse)
            .then(entity => dispatch(loadEntitySuccess(entity)))
            .catch((error) =>  dispatch(addValidation(error)));
    }
}

export const saveOrUpdate = () => {
    return (dispatch, getState) => {
        dispatch(validateEntity());
        if (getState().organizationLevel.validations.length == 0) {
            const method = (getState().organizationLevel.entity.id || getState().organizationLevel.entity.id > 0) ? 'PUT' : 'POST';
            let x = getState().organizationLevel.entity

            const param = requestOptions(method, x);
            fetch('http://localhost:8080/api/organization-levels', param)
                .then(handleResponse)
                .then(dispatch(closeForm))
                .then(response => dispatch(saveEntitySuccess(response)))
                .catch((error) =>  dispatch(addValidation(error)));

        }
    };
}

export const settingHandler = (id) => {
    return {
        type: MODELID_CHANGED, id
    }
}

const validateEntity = () => {
    return (dispatch, getState) => {
        dispatch(requiredValidation('name'))
        dispatch(requiredValidation('code'))
    }
}

export const requiredValidation = (field) => {
    return {
        type: REQUIRED_VALIDATION, field
    }
}

const loadRootsSuccess = (list) => {
    return {
        type: ROOT_DATA, list
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
export const closeForm = () => {
    return {
        type: CLOSE_FORM
    }
}

export const inputChangeHandler = (value, field) => {
    return {
        type: INPUT_CHANGE_VALUE, field, value
    }
}

export const createEntity = (id, modelId) => {
    return {
        type: CREATE_ENTITY, parentId : id, modelId
    }
}

export const deleteEntitiesSuccess = () => {
    return {
        type: DELETE_SUCCESS
    }
}
