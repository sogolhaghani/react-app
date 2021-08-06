import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import OstanTable from './Ostan.table.ui';
import { loadMessages, loadDataTable, loadHeadCells } from './ostan.actions'

export default function OstanContainer() {
    const dispatch = useDispatch();
    const status = useSelector(state => state.ostan.status)
    dispatch(loadMessages());
    dispatch(loadHeadCells())
    if (status == 'init' || status == 'deleted' || status == 'created')
        dispatch(loadDataTable());
    return (
        <OstanTable />
    )

};