import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


import Table from './OrganizationLevel.tree.ui';
import { loadMessages, loadRoots } from './organizationLevel.actions'

export default function Container() {
    const dispatch = useDispatch();
    const status = useSelector(state => state.organizationLevel.status)
    dispatch(loadMessages());
    if (status == 'init' || status == 'deleted' || status == 'created')
        dispatch(loadRoots());
    return (
        <Table />
    )

};