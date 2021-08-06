import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import ShahrTable from './Shahr.table.ui';
import { loadMessages, loadDataTable, loadHeadCells } from './shahr.actions'
import {  loadDataTable as loadOstans} from '../ostan/ostan.actions'

export default function ShahrContainer() {
    const dispatch = useDispatch();
    const status = useSelector(state => state.shahr.status)
    dispatch(loadMessages());
    dispatch(loadHeadCells())
    if (status == 'init' )
        dispatch(loadOstans())
    if (status == 'init' || status == 'deleted' || status == 'created')
        dispatch(loadDataTable());
    return (
        <ShahrTable />
    )

};