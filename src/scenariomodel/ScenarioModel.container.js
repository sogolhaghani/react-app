import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


import Table from './ScenarioModel.table.ui';
import { loadMessages, loadDataTable, loadHeadCells } from './scenariomodel.actions'

export default function Container() {
    const dispatch = useDispatch();
    const status = useSelector(state => state.scenarioModel.status)
    dispatch(loadMessages());
    dispatch(loadHeadCells())
    if (status == 'init' || status == 'deleted' || status == 'created')
        dispatch(loadDataTable());

    return (
        <Table />
    )

};