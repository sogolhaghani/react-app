import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";


import SignIn from './SignIn.ui';
import {loadMessages} from './signin.actions'

export default function SignInContainer() {
    const dispatch = useDispatch();
    const history = useHistory();
    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated)
    const token = localStorage.getItem('token');
    if(token)
        history.push('/home')

    dispatch(loadMessages());
    return (<SignIn />)
    
};