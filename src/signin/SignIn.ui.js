import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Paper from '@material-ui/core/Paper';


import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { inputChangeHandler, submitHandler, requiredValidation } from './signin.actions'



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  main: {
    justifyContent : 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  paper :{
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    padding: theme.spacing(2),
    margin: theme.spacing(2 , 0, 1, 0),
  }
}));

export default function SignIn() {
  const validationsLen = useSelector(state => state.authentication.validations.length) || 0;
  const validations = useSelector(state => state.authentication.validations) || [];

  const dispatch = useDispatch()
  const onTextFieldChange = (event, property) => {
    dispatch(inputChangeHandler(event.target.value, property))
  };

  const onTextFieldBlur = (property) => {
    dispatch(requiredValidation(property))
  };

  const onSubmit = () => {
    dispatch(submitHandler())
  };

  const dispayValidationText = (field) => {
    if (validations.filter(f => f.field == field).length == 0)
        return '';
    const fieldValidations = validations.filter(f => f.field == field);
    let valMessage = '';
    fieldValidations.forEach(element => {
        valMessage += messages[field + '_' + element.type.toLowerCase()];
        valMessage += '\n';
    });
    return valMessage;

};


  const classes = useStyles();
  const messages = useSelector(state => state.authentication.messages)
  const username = useSelector(state => state.authentication.login.username)
  const password = useSelector(state => state.authentication.login.password)
  return (
    <Container component="main" maxWidth="sm" className={classes.main} >
      <Paper elevation={0} className={classes.paper} >
        {/* <CssBaseline /> */}
        
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {messages.sign_in}
          </Typography>
          {/* <form className={classes.form} noValidate> */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={messages.email}
            name="email"
            // autoComplete="email"
            autoFocus
            value={username}
            onChange={e => onTextFieldChange(e, 'email')}
            onBlur={e=> onTextFieldBlur('email')}
            helperText={dispayValidationText('email')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={messages.password}
            type="password"
            id="password"
            // autoComplete="current-password"
            value={password}
            onChange={e => onTextFieldChange(e, 'password')}
            onBlur={e=> onTextFieldBlur('password')}
            helperText={dispayValidationText('password')}
          />
          <FormControlLabel className={classes.form}
            control={<Checkbox value="remember" color="primary" />}
            label={messages.remember_me}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => onSubmit()}>
            {messages.signin}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                {messages.forget_password}
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {messages.signup}
              </Link>
            </Grid>
          </Grid>
          {/* </form> */}
        
        {/* <Box mt={8}>
          <Copyright />
        </Box> */}
      </Paper>
    </Container>
  );
}
