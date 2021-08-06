import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Divider } from '@material-ui/core';
import LowPriorityIcon from '@material-ui/icons/LowPriority';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { saveOrUpdate, inputChangeHandler, requiredValidation } from './shahr.actions'




const useStyles = makeStyles((theme) => ({
    helperText: {
        whiteSpace: 'break-spaces'
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    breadcrumbs: {
        color: theme.palette.common.lightGray,
        marginTop: theme.spacing(1),

    },
    divider: {
        backgroundColor: theme.palette.divider,
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
    button: {
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(2),
    }
}));


function EnhanceAlert() {
    const dispatch = useDispatch()
    const validations = useSelector(state => state.shahr.validations.filter(item => !item.read)) || [];

    const handleRead = (index) => {
        dispatch(handleReadValidation(index));
    }

    return (
        validations.map((item, index) => { return <Alert onClose={() => handleRead(index)} key={index} severity={item.severity}>{item.message}</Alert> })
    )
}

export default function ScrollDialog(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const messages = useSelector(state => state.shahr.messages) || {}
    const baseMessages = useSelector(state => state.base.messages) || {};
    const validationsLen = useSelector(state => state.shahr.validations.length) || 0;
    const validations = useSelector(state => state.shahr.validations) || [];
    const name = useSelector(state => state.shahr.entity.name);
    const code = useSelector(state => state.shahr.entity.code);
    
    const status = useSelector(state => state.shahr.status);
    const ostanId = useSelector(state => state.shahr.entity.ostanId) || "";
    const ostans = useSelector(state => state.ostan.table.list) || [];
    const history = useHistory();

    if (status == 'created') {
        history.push("/shahr/list")
    }

    const onTextFieldChange = (event, property) => {
        dispatch(inputChangeHandler(event.target.value, property))
    };

    const submitHandler = () => {
        dispatch(saveOrUpdate());
    }

    const validateHandler = (field) => {
        dispatch(requiredValidation(field));
    }

    const displayValidationText = (field) => {
        if (validations.filter(f => f.field == field).length == 0)
            return '';
        const fieldValidations = validations.filter(f => f.field == field);
        let valMessage = '';
        fieldValidations.forEach(element => {
            valMessage += messages[field + '_' + element.type.toLowerCase()];
            valMessage += '\n';
        });
        return valMessage;

    }

    return (
        <div>
            <Typography variant="h5" component="h4">
                {messages.entity}
            </Typography>
            <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
                <Typography color="inherit">{baseMessages.base_information}</Typography>
                <Typography color="inherit">{messages.entity}</Typography>
                <Typography color="textPrimary">{baseMessages.form}</Typography>
            </Breadcrumbs>
            <EnhanceAlert />
            <Divider className={classes.divider} />

            <Paper className={classes.paper} elevation={0}>
                <TextField
                    FormHelperTextProps={{
                        className: classes.helperText
                    }}
                    onBlur={e => validateHandler('name')}
                    onChange={e => onTextFieldChange(e, 'name')}
                    error={displayValidationText('name').length > 0}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label={messages.name}
                    helperText={displayValidationText('name')}

                    value={name} />
                <TextField
                    FormHelperTextProps={{
                        className: classes.helperText
                    }}
                    onBlur={e => validateHandler('code')}
                    onChange={e => onTextFieldChange(e, 'code')}
                    error={displayValidationText('code').length > 0}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="code"
                    helperText={displayValidationText('code')}
                    label={messages.code} fullWidth value={code} />


                <FormControl fullWidth className={classes.formControl}
                    variant="outlined"
                    required >
                    <InputLabel id="shahr-ostan-label">{messages.ostan}</InputLabel>
                    <Select
                        label={messages.ostan}
                        labelId="shahr-ostan-label"
                        id="shahr-ostan-outlined"
                        value={ostanId}
                        onChange={e => onTextFieldChange(e, 'ostanId')}>
                        <MenuItem value="">
                            <em>{"-"}</em>
                        </MenuItem>
                        {ostans.map((item, index) => {
                            return <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                        })}

                    </Select>
                    {
                        displayValidationText('ostan').length > 0 ? <FormHelperText>{displayValidationText('ostan')}</FormHelperText>
                            : <></>
                    }
                </FormControl>


                <Button onClick={submitHandler} color="primary" variant="contained" className={classes.button}>
                    {baseMessages.saveChanges}
                </Button>
                <Button component={(props) => <Link to={"/shahr/list"} {...props} />}
                    color="default"
                    variant="contained"
                    endIcon={<LowPriorityIcon />}
                    className={classes.button}>
                    {baseMessages.goToList}
                </Button>
            </Paper>
        </div>
    );
}