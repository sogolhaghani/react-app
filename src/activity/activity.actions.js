import { requestGetOptions, handleResponse, requestOptions, requestDeleteOptions } from '../common/actions.utils'

export const SORT = 'ACTIVITY_SORT';
export const PAGE = 'ACTIVITY_PAGE';
export const ROOT_DATA = 'ACTIVITY_ROOT_DATA';
export const ENTITY_DATA = 'ACTIVITY_ENTITY_DATA';
export const LOAD_MESSAGES = 'ACTIVITY_LOAD_MESSAGES';
export const SAVE_OR_UPDATE_SUCCESS = 'ACTIVITY_SAVE_OR_UPDATE_SUCCESS';
export const REQUIRED_VALIDATION = 'ACTIVITY_REQUIRED_VALIDATION';
export const CLOSE_FORM = 'ACTIVITY_CLOSE_FORM';
export const INPUT_CHANGE_VALUE = 'ACTIVITY_INPUT_CHANGE_VALUE';
export const CREATE_ENTITY = 'ACTIVITY_CREATE_ENTITY';
export const DELETE_SUCCESS = 'ACTIVITY_DELETE_SUCCESS';
export const MODELID_CHANGED = 'ACTIVITY_MODELID_CHANGED';
export const LOAD_CHILDREN_SUCCESS = 'ACTIVITY_LOAD_CHILDREN_SUCCESS';
export const CLOSE_CHILDREN = 'ACTIVITY_CLOSE_CHILDREN';
export const VALIDATION = 'ACTIVITY_VALIDATION';
export const READ_VALIDATION = 'ACTIVITY_READ_VALIDATION';

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
        fetch('http://localhost:8080/api/activities/' + id, requestDeleteOptions())
            .then(handleResponse)
            .then(dispatch(deleteEntitiesSuccess()))
    }
}

export const loadRoots = () => {
    return (dispatch, getState) => {
        const id = getState().base.action.value
        return fetch('http://localhost:8080/api/activities/root/' + id, requestGetOptions())
            .then(handleResponse)
            .then(list => dispatch(loadRootsSuccess(list)));

    }

}

export const loadChildren = (id, level) => {
    return (dispatch, getState) => {
        return fetch('http://localhost:8080/api/activities/child/' + id, requestGetOptions())
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
        return fetch('http://localhost:8080/api/activities/' + id, requestGetOptions())
            .then(handleResponse)
            .then(entity => dispatch(loadEntitySuccess(entity)))
    }
}

export const saveOrUpdate = () => {
    return (dispatch, getState) => {
        dispatch(validateEntity());
        if (getState().activity.validations.length == 0) {
            const method = (getState().activity.entity.id || getState().activity.entity.id > 0) ? 'PUT' : 'POST';
            let x = getState().activity.entity
            x.isPublic = false
            x.isLocked = false
            x.createDate = new Date()
            const param = requestOptions(method, getState().activity.entity);
            fetch('http://localhost:8080/api/activities', param)
                .then(handleResponse)
                .then(dispatch(closeForm))
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
        type: CREATE_ENTITY, parentId : id, modelId, activityType : type
    }
}

export const deleteEntitiesSuccess = () => {
    return {
        type: DELETE_SUCCESS
    }
}
