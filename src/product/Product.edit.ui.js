import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Divider } from '@material-ui/core';
import LowPriorityIcon from '@material-ui/icons/LowPriority';


import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { saveOrUpdate, inputChangeHandler, requiredValidation, handleReadValidation } from './product.actions'




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

const productTypes = () => {
    const messages = useSelector(state => state.product.messages) || {}
    return [
        { value: 'SOURCE', label: messages.SOURCE },
        { value: 'CONSUMABLE', label: messages.CONSUMABLE },
        { value: 'OTHER', label: messages.OTHER }
    ]
}

const productGroupTypes = () => {
    const messages = useSelector(state => state.product.messages) || {}
    return [
        { value: 'PRIMARY', label: messages.PRIMARY },
        { value: 'SUBSIDIARY', label: messages.SUBSIDIARY }
    ]
}


function EnhanceAlert() {
    const dispatch = useDispatch()
    const validations = useSelector(state => state.product.validations.filter(item => !item.read)) || [];

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
    const messages = useSelector(state => state.product.messages) || {}
    const baseMessages = useSelector(state => state.base.messages) || {};
    const validationsLen = useSelector(state => state.product.validations.length) || 0;
    const validations = useSelector(state => state.product.validations) || [];
    const name = useSelector(state => state.product.entity.name);
    const code = useSelector(state => state.product.entity.code);
    const productType = useSelector(state => state.product.entity.productType);
    const groupType = useSelector(state => state.product.entity.groupType);
    const type = useSelector(state => state.product.entity.type);
    const group = useSelector(state => state.product.entity.group);
    const hasIncome = useSelector(state => state.product.entity.hasIncome);
    const driverId = useSelector(state => state.product.entity.driverId) || "";

    const status = useSelector(state => state.product.status);

    const drivers = useSelector(state => state.drivers.table.list).filter(item=> item.type == 'PRODUCT') || [];
    const history = useHistory();

    if (status == 'created') {
        history.push("/product/list")
    }

    const onTextFieldChange = (event, property) => {
        dispatch(inputChangeHandler(event.target.value, property))
    };

    const onSwitchChange = (event, property) =>{
        dispatch(inputChangeHandler(event.target.checked, property))
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
                <Grid container spacing={2}>
                    <Grid container item xs={6} spacing={0}>
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
                    </Grid>
                    <Grid container item xs={6} spacing={0}>
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
                    </Grid>
                    <Grid container item xs={6} spacing={0}>
                        <FormControl fullWidth className={classes.formControl}
                        error={displayValidationText('productType').length > 0 ? true : false}
                            variant="outlined"
                            required >
                            <InputLabel id="product-productType-label">{messages.productType}</InputLabel>
                            <Select
                                label={messages.productType}
                                labelId="product-productType-label"
                                id="product-productType-outlined"
                                value={productType}
                                onChange={e => { onTextFieldChange(e, 'productType'); validateHandler('productType'); }}>
                                <MenuItem value="">
                                    <em>{"-"}</em>
                                </MenuItem>
                                {productTypes().map((item, index) => {
                                    return <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                })}

                            </Select>
                            {
                                displayValidationText('productType').length > 0 ? <FormHelperText>{displayValidationText('productType')}</FormHelperText>
                                    : <></>
                            }
                        </FormControl>
                    </Grid>
                    <Grid container item xs={6} spacing={0}>

                        <FormControl fullWidth className={classes.formControl}
                        error={displayValidationText('groupType').length > 0 ? true : false}
                            variant="outlined"
                            required >
                            <InputLabel id="product-groupType-label">{messages.groupType}</InputLabel>
                            <Select
                                label={messages.groupType}
                                labelId="product-groupType-label"
                                id="product-groupType-outlined"
                                value={groupType}
                                onChange={e => { onTextFieldChange(e, 'groupType'); validateHandler('groupType'); }}>
                                <MenuItem value="">
                                    <em>{"-"}</em>
                                </MenuItem>
                                {productGroupTypes().map((item, index) => {
                                    return <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                })}

                            </Select>
                            {
                                displayValidationText('groupType').length > 0 ? <FormHelperText>{displayValidationText('groupType')}</FormHelperText>
                                    : <></>
                            }
                        </FormControl>
                    </Grid>
                    <Grid container item xs={6} spacing={0}>
                        <TextField
                            FormHelperTextProps={{
                                className: classes.helperText
                            }}
                            onBlur={e => validateHandler('type')}
                            onChange={e => onTextFieldChange(e, 'type')}
                            error={displayValidationText('type').length > 0}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="type"
                            helperText={displayValidationText('type')}
                            label={messages.type} fullWidth value={type} />
                    </Grid>
                    <Grid container item xs={6} spacing={0}>
                        <TextField
                            FormHelperTextProps={{
                                className: classes.helperText
                            }}
                            onBlur={e => validateHandler('group')}
                            onChange={e => onTextFieldChange(e, 'group')}
                            error={displayValidationText('group').length > 0}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="group"
                            helperText={displayValidationText('group')}
                            label={messages.group} fullWidth value={group} />
                    </Grid>
                    <Grid container item xs={6} spacing={0}>

                        <FormControl component="fieldset">
                            <FormControlLabel
                                checked={hasIncome}
                                control={<Switch color="primary" onChange={e => onSwitchChange(e, 'hasIncome')} />}
                                label={messages.hasIncome}
                                labelPlacement="top"
                            />
                            {/* {
                                displayValidationText('hasIncome').length > 0 ? <FormHelperText>{displayValidationText('hasIncome')}</FormHelperText>
                                    : <></>
                            } */}
                        </FormControl>
                    </Grid>
                    <Grid container item xs={6} spacing={0}>

                        <FormControl fullWidth className={classes.formControl}
                            variant="outlined"
                            >
                            <InputLabel id="product-driver-label">{messages.driver}</InputLabel>
                            <Select
                                label={messages.driver}
                                labelId="product-driver-label"
                                id="product-driver-outlined"
                                value={driverId}
                                onChange={e => onTextFieldChange(e, 'driverId')}>
                                <MenuItem value="">
                                    <em>{"-"}</em>
                                </MenuItem>
                                {drivers.map((item, index) => {
                                    return <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                })}

                            </Select>
                            {
                                displayValidationText('driverId').length > 0 ? <FormHelperText>{displayValidationText('driverId')}</FormHelperText>
                                    : <></>
                            }
                        </FormControl>

                    </Grid>
                    </Grid>
                <Button onClick={submitHandler} color="primary" variant="contained" className={classes.button}>
                    {baseMessages.saveChanges}
                </Button>
                <Button component={(props) => <Link to={"/product/list"} {...props} />}
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