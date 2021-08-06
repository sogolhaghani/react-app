import { requestGetOptions, handleResponse, requestOptions, requestDeleteOptions } from '../common/actions.utils'

export const HEAD_CELL_DATA = 'SCENARIOMODEL_HEAD_CELL_DATA';
export const SORT = 'SCENARIOMODEL_SORT';
export const PAGE = 'SCENARIOMODEL_PAGE';
export const TABLE_DATA = 'SCENARIOMODEL_TABLE_DATA';
export const ENTITY_DATA = 'SCENARIOMODEL_ENTITY_DATA';
export const LOAD_MESSAGES = 'SCENARIOMODEL_LOAD_MESSAGES';
export const SAVE_OR_UPDATE_SUCCESS = 'SCENARIOMODEL_SAVE_OR_UPDATE_SUCCESS';
export const REQUIRED_VALIDATION = 'SCENARIOMODEL_REQUIRED_VALIDATION';
export const INPUT_CHANGE_VALUE = 'SCENARIOMODEL_INPUT_CHANGE_VALUE';
export const CREATE_ENTITY = 'SCENARIOMODEL_CREATE_ENTITY';
export const DELETE_SUCCESS = 'SCENARIOMODEL_DELETE_SUCCESS';
export const MODELID_CHANGED = 'SCENARIOMODEL_MODELID_CHANGED';
export const VALIDATION = 'SCENARIOMODEL_VALIDATION';
export const READ_VALIDATION = 'SCENARIOMODEL_READ_VALIDATION';

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
            fetch('http://localhost:8080/api/scenario-models/'+ids[id], requestDeleteOptions())
                .then(handleResponse)
                .then(id == ids.length -1 ? dispatch(deleteEntitiesSuccess()) : "")
                .catch((error) =>  dispatch(addValidation(error)));
        }
    }
}

export const loadDataTable = () => {
    return (dispatch, getState) => {
        return fetch('http://localhost:8080/api/scenario-models', requestGetOptions())
            .then(handleResponse)
            .then(list => dispatch(loadDataTableSuccess(list)))
            .catch((error) =>  dispatch(addValidation(error)));

    }

}

export const loadEntity = (id) => {
    return (dispatch, getState) => {
        return fetch('http://localhost:8080/api/scenario-models/' + id, requestGetOptions())
            .then(handleResponse)
            .then(entity => dispatch(loadEntitySuccess(entity)))
            .catch((error) =>  dispatch(addValidation(error)));
    }
}

export const saveOrUpdate = () => {
    return (dispatch, getState) => {
        dispatch(validateEntity());
        if (getState().scenarioModel.validations.length == 0) {
            const method = (getState().scenarioModel.entity.id || getState().scenarioModel.entity.id > 0) ? 'PUT' : 'POST';
            let x = getState().scenarioModel.entity
            x.isPublic = false
            x.isLocked = false
            x.createDate = new Date()
            const param = requestOptions(method, x);
            fetch('http://localhost:8080/api/scenario-models', param)
                .then(handleResponse)
                .then(response => dispatch(saveEntitySuccess(response)))
                .catch((error) =>  dispatch(addValidation(error)));

        }
    };
}

export const lockModel = (id) =>{
    return (dispatch, getState) => {
        const method = 'PUT';
        let x = getState().scenarioModel.table.list.filter(i=>i.id == id)[0]
        x.isPublic = false
        x.isLocked = true
        x.createDate = new Date()
        const param = requestOptions(method, x);
        fetch('http://localhost:8080/api/scenario-models', param)
            .then(handleResponse)
            .then(response => dispatch(saveEntitySuccess(response)))
            .catch((error) =>  dispatch(addValidation(error)));
    }
}

export const settingHandler = (id, title) =>{
    return {
        type : MODELID_CHANGED, id, title
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
