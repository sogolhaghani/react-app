import { requestGetOptions, handleResponse, requestOptions, requestDeleteOptions } from '../common/actions.utils'

export const SORT = 'RESOURCE_SORT';
export const PAGE = 'RESOURCE_PAGE';
export const ROOT_DATA = 'RESOURCE_ROOT_DATA';
export const ENTITY_DATA = 'RESOURCE_ENTITY_DATA';
export const LOAD_MESSAGES = 'RESOURCE_LOAD_MESSAGES';
export const SAVE_OR_UPDATE_SUCCESS = 'RESOURCE_SAVE_OR_UPDATE_SUCCESS';
export const REQUIRED_VALIDATION = 'RESOURCE_REQUIRED_VALIDATION';
export const INPUT_CHANGE_VALUE = 'RESOURCE_INPUT_CHANGE_VALUE';
export const CREATE_ENTITY = 'RESOURCE_CREATE_ENTITY';
export const DELETE_SUCCESS = 'RESOURCE_DELETE_SUCCESS';
export const MODELID_CHANGED = 'RESOURCE_MODELID_CHANGED';
export const LOAD_CHILDREN_SUCCESS = 'RESOURCE_LOAD_CHILDREN_SUCCESS';
export const CLOSE_CHILDREN = 'RESOURCE_CLOSE_CHILDREN';
export const VALIDATION = 'RESOURCE_VALIDATION';
export const READ_VALIDATION = 'RESOURCE_READ_VALIDATION';

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
        fetch('http://localhost:8080/api/resources/' + id, requestDeleteOptions())
            .then(handleResponse)
            .then(dispatch(deleteEntitiesSuccess()))
    }
}

export const loadRoots = () => {
    return (dispatch, getState) => {
        const id = getState().base.action.value
        return fetch('http://localhost:8080/api/resources/root/' + id, requestGetOptions())
            .then(handleResponse)
            .then(list => dispatch(loadRootsSuccess(list)));

    }

}

export const loadChildren = (id, level) => {
    return (dispatch, getState) => {
        return fetch('http://localhost:8080/api/resources/child/' + id, requestGetOptions())
            .then(handleResponse)
            .then(list => dispatch(loadChildrenSuccess(list, id, level)));
    }
}

const loadChildrenSuccess = (list, id, level) => {
    return {
        type: LOAD_CHILDREN_SUCCESS, list, id, level
    }
}

export const loadEntity = (id) => {
    return (dispatch, getState) => {
        return fetch('http://localhost:8080/api/resources/' + id, requestGetOptions())
            .then(handleResponse)
            .then(entity => dispatch(loadEntitySuccess(entity)))
    }
}

export const saveOrUpdate = () => {
    return (dispatch, getState) => {
        dispatch(validateEntity());
        if (getState().resource.validations.length == 0) {
            const method = (getState().resource.entity.id || getState().resource.entity.id > 0) ? 'PUT' : 'POST';
            let x = getState().resource.entity

            const param = requestOptions(method, getState().resource.entity);
            fetch('http://localhost:8080/api/resources', param)
                .then(handleResponse)
                .then(response => dispatch(saveEntitySuccess(response)))

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
        dispatch(requiredValidation('identityType'))
        dispatch(requiredValidation('elementType'))
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

export const createEntity = (id, modelId, type) => {
    return {
        type: CREATE_ENTITY, parentId : id, modelId, resourceType : type
    }
}

export const deleteEntitiesSuccess = () => {
    return {
        type: DELETE_SUCCESS
    }
}
