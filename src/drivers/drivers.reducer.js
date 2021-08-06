import _ from 'lodash';
import utils from '../common/reducer.util'
import * as type from './drivers.actions';
import messages from './drivers.messages';

//TODO: remove
const headCells = [
  { id: 'id', numeric: false, disablePadding: true, label: messages.id },
  { id: 'name', numeric: true, disablePadding: false, label: messages.name },
  { id: 'code', numeric: true, disablePadding: false, label: messages.code },
  { id: 'unit', numeric: false, disablePadding: false, label: messages.unit },
  { id: 'type', numeric: false, disablePadding: false, label: messages.type }
];

const initState = {
  table: {
    order: 'asc',
    orderBy: 'id',
    list: [],
    pageItem: { rowsPerPage: 5, total: 0, page: 0 }
  },
  entity: {},
  validations: [],
  status: 'init'
}


export default function reducer(state = initState, action) {
  let newState = _.clone(state, {});
  switch (action.type) {
    case type.LOAD_MESSAGES:
      newState.messages = messages
      return newState
    case type.HEAD_CELL_DATA:
      newState.headCells = headCells
      return newState
    case type.SORT:
      const newOrder = utils.handleRequestSort(action.property, newState.table.order, newState.table.orderBy)
      newState.table.order = newOrder;
      newState.table.orderBy = action.property;
      newState.table.list = utils.stableSort(state.table.list, utils.getComparator(newState.table.order, newState.table.orderBy))
      return newState;
    case type.TABLE_DATA:
      newState.table.list = action.list;
      newState.table.pageItem.total = action.list.length;
      if(newState.table.pageItem.page * newState.table.pageItem.rowsPerPage + 1 > newState.table.pageItem.total )
        newState.table.pageItem.page = newState.table.pageItem.page -1
      // newState.status = 'init';
      return newState;
    case type.PAGE:
      newState.table.pageItem.page = action.page;
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
        newState.validations.push({ field: action.field, type: 'REQUIRED', severity : 'error', read : true });
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
      newState.entity = {};
      newState.validations = [];
      return newState;
    case type.DELETE_SUCCESS:
      newState.status = 'deleted';
      return newState;
    case type.VALIDATION:
      newState.validations.push({severity : 'error', message : action.error, read : false})
      return newState
    case type.READ_VALIDATION:
      newState.validations.filter(item => !item.read)[action.index].read = true;
      return newState
    default:
      return state;
  }
}


