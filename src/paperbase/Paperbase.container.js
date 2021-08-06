import React from 'react';
import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";


import Paperbase from './Paperbase.ui';
import {loadMessages} from './paperbase.actions'

export default function SignInContainer() {
    const dispatch = useDispatch();
    const history = useHistory();
    const token = localStorage.getItem('token');
    if (!token)
      history.push('/')

    dispatch(loadMessages());
    return (<Paperbase />)
    
};