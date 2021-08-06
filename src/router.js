import React from 'react';
import CssBasesline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import SignIn from './signin/Signin.container';
import Paperbase from './paperbase/Paperbase.container';

import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'


const jss = create({ plugins: [...jssPreset().plugins, rtl()] });


const router = (props) => (
  <BrowserRouter>
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme} >
        <CssBasesline />
        <Switch>
          <Route path='/home' component={Paperbase} />
          <Route path='/' component={SignIn} />
        </Switch>
      </ThemeProvider>
    </StylesProvider>
  </BrowserRouter>
)

export default router


