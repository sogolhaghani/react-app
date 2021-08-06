import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import ProductTable from './Product.table.ui';
import { loadMessages, loadDataTable, loadHeadCells } from './product.actions'
import { loadDataTable as loadDrivers } from '../drivers/drivers.actions'

export default function ProductContainer() {
    const dispatch = useDispatch();
    const status = useSelector(state => state.product.status)
    const modelId = useSelector(state => state.base.action.value);
    dispatch(loadMessages());
    dispatch(loadHeadCells())
    if (status == 'init')
        dispatch(loadDrivers());
    if (status == 'init') {
        const urlParam = '/type/' + modelId + '/' + 'PRODUCT'
        dispatch(loadDrivers(urlParam));
    }
    return (
        <ProductTable />
    )

};