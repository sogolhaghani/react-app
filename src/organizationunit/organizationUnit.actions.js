import { requestGetOptions, handleResponse, requestOptions, requestDeleteOptions } from '../common/actions.utils'

import {updateFilterList} from '../organizationlevel/organizationLevel.actions'

export const SORT = 'ORGANIZATIONUNIT_SORT';
export const PAGE = 'ORGANIZATIONUNIT_PAGE';
export const ROOT_DATA = 'ORGANIZATIONUNIT_ROOT_DATA';
export const ENTITY_DATA = 'ORGANIZATIONUNIT_ENTITY_DATA';
export const LOAD_MESSAGES = 'ORGANIZATIONUNIT_LOAD_MESSAGES';
export const SAVE_OR_UPDATE_SUCCESS = 'ORGANIZATIONUNIT_SAVE_OR_UPDATE_SUCCESS';
export const REQUIRED_VALIDATION = 'ORGANIZATIONUNIT_REQUIRED_VALIDATION';
export const CLOSE_FORM = 'ORGANIZATIONUNIT_CLOSE_FORM';
export const INPUT_CHANGE_VALUE = 'ORGANIZATIONUNIT_INPUT_CHANGE_VALUE';
export const CREATE_ENTITY = 'ORGANIZATIONUNIT_CREATE_ENTITY';
export const DELETE_SUCCESS = 'ORGANIZATIONUNIT_DELETE_SUCCESS';
export const MODELID_CHANGED = 'ORGANIZATIONUNIT_MODELID_CHANGED';
export const LOAD_CHILDREN_SUCCESS = 'ORGANIZATIONUNIT_LOAD_CHILDREN_SUCCESS';
export const CLOSE_CHILDREN = 'ORGANIZATIONUNIT_CLOSE_CHILDREN';
export const VALIDATION = 'ORGANIZATIONUNIT_VALIDATION';
export const READ_VALIDATION = 'ORGANIZATIONUNIT_READ_VALIDATION';

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
        fetch('http://localhost:8080/api/organization-units/' + id, requestDeleteOptions())
            .then(handleResponse)
            .then(dispatch(deleteEntitiesSuccess()))
    }
}

export const loadRoots = () => {
    return (dispatch, getState) => {
        const id = getState().base.action.value
        return fetch('http://localhost:8080/api/organization-units/root/' + id, requestGetOptions())
            .then(handleResponse)
            .then(list => dispatch(loadRootsSuccess(list)))
            .catch((error) =>  dispatch(addValidation(error)));

    }

}

export const loadChildren = (id, level) => {
    return (dispatch, getState) => {
        return fetch('http://localhost:8080/api/organization-units/child/' + id, requestGetOptions())
            .then(handleResponse)
            .then(list => dispatch(loadChildrenSuccess(list, id, level)))
            .catch((error) =>  dispatch(addValidation(error)));
    }
}

export const loadDataTable = () => {
    return (dispatch, getState) => {
        return fetch('http://localhost:8080/api/organization-units', requestGetOptions())
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
        return fetch('http://localhost:8080/api/organization-units/' + id, requestGetOptions())
            .then(handleResponse)
            .then(entity => {
                dispatch(loadEntitySuccess(entity));
                dispatch(loadOrganizationLevel(entity));
            })
            .catch((error) =>  dispatch(addValidation(error)));
    }
}

export const saveOrUpdate = () => {
    return (dispatch, getState) => {
        dispatch(validateEntity());
        if (getState().organizationUnit.validations.length == 0) {
            const method = (getState().organizationUnit.entity.id || getState().organizationUnit.entity.id > 0) ? 'PUT' : 'POST';
            let x = getState().organizationUnit.entity
            x.path="-"
            const param = requestOptions(method, x);
            fetch('http://localhost:8080/api/organization-units', param)
                .then(handleResponse)
                .then(response => dispatch(saveEntitySuccess(response)))
                .catch((error) =>  dispatch(addValidation(error)));

        }
    };
}

export const loadOrganizationLevel = (entity) =>{
    return (dispatch, getState) => {
        let filterList = []
        if(!entity){
            filterList = getState().organizationLevel.table.list.filter(item=> item.isRoot)
        }else{
            const level = getState().organizationLevel.table.list.filter(item=> item.id = entity.levelId)[0]
            filterList = getState().organizationLevel.table.list.filter(item=> item.parentId == level.parentId)
        }
        dispatch(updateFilterList(filterList))
    }
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
        dispatch(requiredValidation('manager'))
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
