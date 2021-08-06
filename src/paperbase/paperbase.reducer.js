import _ from 'lodash';
import * as type from './paperbase.actions';
import messages from './paperbase.messages';
import {MODELID_CHANGED} from '../scenariomodel/scenariomodel.actions';

const initState = {
  messages : {}
}


export default function reducer(state = initState, action) {
   let newState = _.clone(state, {});
  switch (action.type) {
    case type.LOAD_MESSAGES:
      newState.messages = messages
      return newState
    case MODELID_CHANGED:
      newState.action = {id : 'models', value: action.id , title: action.title};
      return newState;
    case type.CLEAR_ACTION:
      newState.action ={}
      return newState
    default:
      return state
  }
}