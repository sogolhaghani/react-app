import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import LevelGradeTable from './LevelGrade.table.ui';
import { loadMessages, loadDataTable, loadHeadCells } from './levelgrade.actions'
import { loadDataTable as loadOrganizationLevels } from '../organizationlevel/organizationLevel.actions'

export default function LevelGradeContainer() {
    const dispatch = useDispatch();
    const status = useSelector(state => state.levelGrade.status)
    dispatch(loadMessages());
    dispatch(loadHeadCells());
    if (status == 'init')
        dispatch(loadOrganizationLevels());
    if (status == 'init' || status == 'deleted' || status == 'created')
        dispatch(loadDataTable());
    return (
        <LevelGradeTable />
    )

};