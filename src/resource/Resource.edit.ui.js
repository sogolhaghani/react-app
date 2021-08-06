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

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { saveOrUpdate, inputChangeHandler, requiredValidation } from './resource.actions'

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
    },
    formControl: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    }
}));

function EnhanceAlert() {
    const dispatch = useDispatch()
    const validations = useSelector(state => state.resource.validations.filter(item => !item.read)) || [];

    const handleRead = (index) => {
        dispatch(handleReadValidation(index));
    }

    return (
        validations.map((item, index) => { return <Alert onClose={() => handleRead(index)} key={index} severity={item.severity}>{item.message}</Alert> })
    )
}

const resourceTypes = () => {
    const messages = useSelector(state => state.resource.messages) || {}
    return [
        { value: 'GENERAL', label: messages.GENERAL },
        { value: 'BUDGET', label: messages.BUDGET },
        { value: 'SUBSIDIARY', label: messages.SUBSIDIARY },
        { value: 'DETAIL', label: messages.DETAIL }
    ]
}

const identityTypes = () => {
    const messages = useSelector(state => state.resource.messages) || {}
    return [
        { value: 'EXPENDITURE', label: messages.EXPENDITURE },
        { value: 'INCOME', label: messages.INCOME },
        { value: 'ASSET', label: messages.ASSET },
        { value: 'DEBT', label: messages.DEBT }
    ]
}

const elementTypes = () => {
    const messages = useSelector(state => state.resource.messages) || {}
    return [
        { value: 'PRODUCT', label: messages.PRODUCT },
        { value: 'ACTIVITY', label: messages.ACTIVITY },
        { value: 'OTHERS', label: messages.OTHERS }
    ]
}

export default function ScrollDialog(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const messages = useSelector(state => state.resource.messages) || {}
    const baseMessages = useSelector(state => state.base.messages) || {};
    const validationsLen = useSelector(state => state.resource.validations.length) || 0;
    const validations = useSelector(state => state.resource.validations) || [];
    const name = useSelector(state => state.resource.entity.name);
    const code = useSelector(state => state.resource.entity.code);
    const driverId = useSelector(state => state.resource.entity.driverId);
    const drivers = useSelector(state => state.drivers.table.list);
    const identityType = useSelector(state => state.resource.entity.identityType);
    const elementType = useSelector(state => state.resource.entity.elementType);
    const investment = useSelector(state => state.resource.entity.investment);
    const common = useSelector(state => state.resource.entity.common);
    const fixed = useSelector(state => state.resource.entity.fixed);
    const description = useSelector(state => state.resource.entity.description);
    const resourceType = useSelector(state => state.resource.entity.resourceType);
    const status = useSelector(state => state.resource.status);

    const history = useHistory();
    if (status == 'created') {
        history.push("/resource/list")
    }
    const onTextFieldChange = (event, property) => {
        dispatch(inputChangeHandler(event.target.value, property))
    };

    const onSwitchChange = (event, property) => {
        dispatch(inputChangeHandler(event.target.checked, property))
    };

    const submitHandler = () => {
        dispatch(saveOrUpdate());
    }

    const validateHandler = (field) => {
        dispatch(requiredValidation(field));
    }

    const handleChangeSelect = (event, property) => {
        dispatch(inputChangeHandler(event.target.value, property))
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

                <FormControl fullWidth className={classes.formControl}
                    variant="outlined" disabled
                    required >
                    <InputLabel id="resource-resourceType-label">{messages.resourceType}</InputLabel>
                    <Select
                        label={messages.resourceType}
                        labelId="resource-resourceType-label"
                        id="resource-resourceType-outlined"
                        value={resourceType}
                        onChange={e => onTextFieldChange(e, 'resourceType')}
                    >
                        <MenuItem value="">
                            <em>{"-"}</em>
                        </MenuItem>
                        {resourceTypes().map((item, index) => {
                            return <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        })}

                    </Select>
                    {
                        displayValidationText('resourceType').length > 0 ? <FormHelperText>{displayValidationText('resourceType')}</FormHelperText>
                            : <></>
                    }
                </FormControl>

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
                    error={displayValidationText('identityType').length > 0 ? true : false}
                    required >
                    <InputLabel id="resource-identityType-label">{messages.identityType}</InputLabel>
                    <Select
                        label={messages.identityType}
                        labelId="resource-identityType-label"
                        id="resource-identityType-outlined"
                        value={identityType}
                        onChange={e => onTextFieldChange(e, 'identityType')}
                    >
                        <MenuItem value="">
                            <em>{"-"}</em>
                        </MenuItem>
                        {identityTypes().map((item, index) => {
                            return <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        })}

                    </Select>
                    {
                        displayValidationText('identityType').length > 0 ? <FormHelperText>{displayValidationText('identityType')}</FormHelperText>
                            : <></>
                    }
                </FormControl>


                <FormControl fullWidth className={classes.formControl}
                    variant="outlined"
                    error={displayValidationText('elementType').length > 0 ? true : false}
                    required >
                    <InputLabel id="resource-elementType-label">{messages.elementType}</InputLabel>
                    <Select
                        label={messages.elementType}
                        labelId="resource-elementType-label"
                        id="resource-elementType-outlined"
                        value={elementType}
                        onChange={e => onTextFieldChange(e, 'elementType')}
                    >
                        <MenuItem value="">
                            <em>{"-"}</em>
                        </MenuItem>
                        {elementTypes().map((item, index) => {
                            return <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        })}

                    </Select>
                    {
                        displayValidationText('elementType').length > 0 ? <FormHelperText>{displayValidationText('elementType')}</FormHelperText>
                            : <></>
                    }
                </FormControl>

                {resourceType == 'GENERAL' ?
                    <>
                        <FormControl component="fieldset" disabled={identityType == 'EXPENDITURE' ? false : true}>
                            <FormControlLabel
                                checked={investment}
                                control={<Switch color="primary" onChange={e => onSwitchChange(e, 'investment')} />}
                                label={messages.investment}
                                labelPlacement="top"
                            />
                            {
                                displayValidationText('investment').length > 0 ? <FormHelperText>{displayValidationText('investment')}</FormHelperText>
                                    : <></>
                            }
                        </FormControl>

                        <FormControl component="fieldset" disabled={identityType == 'INCOME' ? false : true}>
                            <FormControlLabel
                                checked={common}
                                control={<Switch color="primary" onChange={e => onSwitchChange(e, 'common')} />}
                                label={messages.common}
                                labelPlacement="top"
                            />
                            {
                                displayValidationText('common').length > 0 ? <FormHelperText>{displayValidationText('common')}</FormHelperText>
                                    : <></>
                            }
                        </FormControl>
                    </> : <></>}
                {resourceType == 'BUDGET' ?
                    <FormControl component="fieldset">
                        <FormControlLabel
                            checked={fixed}
                            control={<Switch color="primary" onChange={e => onSwitchChange(e, 'fixed')} />}
                            label={messages.fixed}
                            labelPlacement="top"
                        />
                        {
                            displayValidationText('fixed').length > 0 ? <FormHelperText>{displayValidationText('fixed')}</FormHelperText>
                                : <></>
                        }
                    </FormControl>
                    : <></>}
                <FormControl fullWidth className={classes.formControl}
                    variant="outlined"
                >
                    <InputLabel id="resource-driver-label">{messages.driver}</InputLabel>
                    <Select
                        label={messages.driver}
                        labelId="resource-driver-label"
                        id="resource-driver-outlined"
                        value={driverId}
                        onChange={e => onTextFieldChange(e, 'driverId')}
                    >
                        <MenuItem value="">
                            <em>{"-"}</em>
                        </MenuItem>
                        {drivers.map((item, index) => {
                            return <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                        })}

                    </Select>
                    {
                        displayValidationText('driver').length > 0 ? <FormHelperText>{displayValidationText('driver')}</FormHelperText>
                            : <></>
                    }
                </FormControl>


                <TextField
                    FormHelperTextProps={{
                        className: classes.helperText
                    }}

                    onChange={e => onTextFieldChange(e, 'description')}
                    error={displayValidationText('description').length > 0}
                    variant="outlined"
                    margin="normal"
                    
                    multiline
                    rows={4}
                    fullWidth
                    id="description"
                    helperText={displayValidationText('description')}
                    label={messages.description} fullWidth value={description} />


                <Button onClick={submitHandler} color="primary" variant="contained" className={classes.button}>
                    {baseMessages.saveChanges}
                </Button>
                <Button component={(props) => <Link to={"/resource/list"} {...props} />}
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