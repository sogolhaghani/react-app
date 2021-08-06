import _ from 'lodash';
import * as type from './signin.actions';
import messages from './signin.messages'

const initState = {
  messages : {},
  login : {},
  validations: []
}


export default function reducer(state = initState, action) {
   let newState = _.clone(state, {});
  switch (action.type) {
    case type.LOAD_MESSAGES:
      newState.messages = messages
      return newState
    case type.INPUT_CHANGED:
      newState.login[action.property] = action.value;
      return newState;
    case type.LOGIN_SUCCESS:
      newState.token = action.token.id_token;
      newState.isAuthenticated = true;
      return newState;
      case type.REQUIRED_VALIDATION:
        const field = newState.login[action.field];
        if (!field || field.length == 0) {
          if (newState.validations.filter(f => f.field == action.field && f.type == 'REQUIRED').length > 0)
            return state;
          newState.validations.push({ field: action.field, type: 'REQUIRED' });
        } else {
          const newVal = newState.validations.filter(f => f.field != action.field || f.type != 'REQUIRED')
          newState.validations = newVal
        }
        return newState;  
    default:
      return state
  }
}