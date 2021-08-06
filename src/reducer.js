import { combineReducers } from 'redux';
import ostan from './ostan/ostan.reducer';
import shahr from './shahr/shahr.reducer';
import levelGrade from './levelgrade/levelgrade.reducer';
import scenarioModel from './scenariomodel/scenarioModel.reducer';
import organizationLevel from './organizationlevel/organizationLevel.reducer';
import activity from './activity/activity.reducer';
import organizationUnit from './organizationunit/organizationUnit.reducer';
import drivers from './drivers/drivers.reducer';
import strategy from './strategy/strategy.reducer';
import product from './product/product.reducer';
import resource from './resource/resource.reducer';

import authReducer from './signin/signin.reducer';
import base from './paperbase/paperbase.reducer';
export default combineReducers({
    ostan,
    shahr,
    drivers,
    strategy,
    product,
    resource,
    scenarioModel,
    activity,
    organizationLevel,
    levelGrade,
    organizationUnit,
    base,
    authentication: authReducer

})