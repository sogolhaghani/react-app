import _ from 'lodash';
import utils from '../common/reducer.util'
import * as type from './resource.actions';
import messages from './resource.messages';


const initState = {
  table: {
    order: 'asc',
    orderBy: 'id',
    list: [],
    pageItem: { rowsPerPage: 5, total: 0, page: 0 }
  },
  entity: { investment: false, common: false, fixed: false },
  validations: [],
  status: 'init'
}

const resourceTypes = ['GENERAL', 'BUDGET', 'SUBSIDIARY', 'DETAIL']

export default function reducer(state = initState, action) {
  let newState = _.clone(state, {});
  newState.lastUpdate = new Date();
  switch (action.type) {
    case type.LOAD_MESSAGES:
      newState.messages = messages
      return newState
    case type.ROOT_DATA:
      newState.table.list = action.list;
      newState.table.list.forEach(x => { x.open = false; x.level = 0; });
      newState.table.pageItem.total = action.list.length;
      if (newState.table.pageItem.page * newState.table.pageItem.rowsPerPage + 1 > newState.table.pageItem.total)
        newState.table.pageItem.page = newState.table.pageItem.page - 1
      return newState;
    case type.LOAD_CHILDREN_SUCCESS:
      newState.table.list = setchildren(newState.table.list, action);
      return newState;
    case type.CLOSE_CHILDREN:
      newState.table.list = setClose(newState.table.list, action.id);
      return newState;
    case type.ENTITY_DATA:
      newState.entity = action.entity;
      newState.status = 'edit'
      newState.validations = []
      return newState;
    case type.SAVE_OR_UPDATE_SUCCESS:
      newState.entity = {};
      newState.validations = [];
      newState.status = 'created';
      return newState;
    case type.REQUIRED_VALIDATION:
      const field = newState.entity[action.field];
      if (!field || field.length == 0) {
        if (newState.validations.filter(f => f.field == action.field && f.type == 'REQUIRED').length > 0)
          return state;
        newState.validations.push({ field: action.field, type: 'REQUIRED', severity: 'error', read: true });
      } else {
        const newVal = newState.validations.filter(f => f.field != action.field || f.type != 'REQUIRED')
        newState.validations = newVal
      }
      return newState;
    case type.INPUT_CHANGE_VALUE:
      newState.entity[action.field] = action.value
      return newState;
    case type.CREATE_ENTITY:
      newState.status = 'create';
      newState.entity = { investment: false, common: false, fixed: false };

      newState.validations = []
      if (action.parentId) {
        newState.entity.parentId = action.parentId
        newState.entity.isRoot = false
        newState.entity.resourceType = resourceTypes[resourceTypes.indexOf(action.resourceType) + 1]
      } else {
        newState.entity.isRoot = true
        newState.entity.resourceType = resourceTypes[0]
      }
      newState.entity.modelId = action.modelId
      newState.validations = [];
      return newState;
    case type.DELETE_SUCCESS:
      newState.status = 'deleted';
      return newState;
    case type.READ_VALIDATION:
      newState.validations.filter(item => !item.read)[action.index].read = true;
      return newState
    default:
      return state;
  }
}

const setchildren = (list = [], action) => {
  list.forEach(x => {
    if (action.id === x.id) {
      x.children = action.list
      x.open = true;
      x.children.forEach(c => {
        c.open = false;
        c.level = action.level + 1
      });
    } else {
      x.children = setchildren(x.children, action)
    }
  })
  return list
}

const setClose = (list = [], id) => {
  list.forEach(x => {
    if (id === x.id) {
      x.open = false;
    } else {
      x.children = setClose(x.children, id)
    }
  })
  return list
}


