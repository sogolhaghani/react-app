import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


import Table from './OrganizationUnit.tree.ui';
import { loadMessages, loadRoots } from './organizationUnit.actions';
import { loadDataTable as loadOrganizationLevels } from '../organizationlevel/organizationLevel.actions';
import { loadDataTable as loadLevelGrades } from '../levelgrade/levelgrade.actions';
import { loadDataTable as loadShahrs } from '../shahr/shahr.actions';

export default function Container() {
    const dispatch = useDispatch();
    const status = useSelector(state => state.organizationUnit.status)
    dispatch(loadMessages());
    if (status == 'init') {
        dispatch(loadOrganizationLevels());
        dispatch(loadLevelGrades());
        dispatch(loadShahrs());
    }
    if (status == 'init' || status == 'deleted' || status == 'created')
        dispatch(loadRoots());
    return (
        <Table />
    )

};