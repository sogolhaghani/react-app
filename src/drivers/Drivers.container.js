import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import DriversTable from './Drivers.table.ui';
import { loadMessages, loadDataTable, loadHeadCells } from './drivers.actions'


export default function DriversContainer() {
    const dispatch = useDispatch();
    const status = useSelector(state => state.drivers.status)
    dispatch(loadMessages());
    dispatch(loadHeadCells())

    if (status == 'init' || status == 'deleted' || status == 'created')
        dispatch(loadDataTable());
    return (
        <DriversTable />
    )

};