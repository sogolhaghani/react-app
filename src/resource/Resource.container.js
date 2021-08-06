import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


import Table from './Resource.tree.ui';
import { loadMessages, loadRoots } from './resource.actions'
import { loadDataTable as loadDrivers } from '../drivers/drivers.actions'

export default function Container() {
    const dispatch = useDispatch();
    const status = useSelector(state => state.activity.status)
    const modelId = useSelector(state => state.base.action.value);
    dispatch(loadMessages());
    if (status == 'init'){
        const urlParam = '/type/' + modelId + '/' + 'RESOURCE'
        dispatch(loadDrivers(urlParam));
    }

    if (status == 'init' || status == 'deleted' || status == 'created')
        dispatch(loadRoots());

    return (
        <Table />
    )

};