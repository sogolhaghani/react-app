import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';

import DescriptionIcon from '@material-ui/icons/Description';
import SecurityIcon from '@material-ui/icons/Security';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PowerOffIcon from '@material-ui/icons/PowerSettingsNew'
import FlagIcon from '@material-ui/icons/Flag';

import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import {finilize, clearAction} from './paperbase.actions'

const categories = [
  {
    id: 'models',
    icon: <AssignmentIcon />,
    to: '/model/list',
    isVisible: false,
    children: [
      { id: 'activity', to: '/activity/list' },
      { id: 'organizationLevel', to: '/organizationLevel/list' },
      { id: 'levelGrade', to: '/levelGrade/list' },
      { id: 'organizationUnit', to: '/organizationUnit/list' },
      { id: 'drivers', to: '/drivers/list' },
      { id: 'strategy', to: '/strategy/list' },
      { id: 'product', to: '/product/list' },
      { id: 'resource', to: '/resource/list' },
    ],
  },
  {
    id: 'scenarios',
    isVisible: false,
    icon: <FlagIcon />,
    children: [

    ],
  },
  {
    id: 'base_information',
    icon: <DescriptionIcon />,
    isVisible: true,
    children: [
      { id: 'ostan', to: '/ostan/list' },
      { id: 'shahr', to: '/shahr/list' }
    ],
  },
  {
    id: 'security_management',
    icon: <SecurityIcon />,
    isVisible: false,
    children: [

    ],
  },
];

const drawerWidth = 300;


const styles = theme => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.5)',
  },
  itemClickable: {
    '&:hover,&:focus': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  categoryItem: {
    paddingLeft: 45
  },
  firebase: {
    fontSize: '18px',
    color: theme.palette.common.white,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    fontWeight: 900,
  },
  itemActiveItem: {
    backgroundColor: theme.palette.primary.main,
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  itemIconFinalize: {
    justifyContent: 'flex-end',
  },
  buttonIconFinalize: {
    color: theme.palette.secondary.dark,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,

  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#233044',
  },
  toolbar: theme.mixins.toolbar,
})

function Navigator(props) {
  const { classes, ...other } = props;
  const messages = useSelector(state => state.base.messages)
  const action = useSelector(state => state.base.action)
  const history = useHistory();
  const dispatch = useDispatch();

  const finilizeAction = (id, value) => {
    dispatch(finilize(id, value))
    dispatch(clearAction())
  }

  return (
    <Drawer variant="permanent" {...other}
      classes={{ paper: classes.drawerPaper, }}
      className={classes.drawer} >
      <div className={clsx(classes.toolbar, classes.firebase)} >
        {messages.project}
      </div>
      <Divider />
      <List disablePadding >
        <ListItem className={clsx(classes.categoryHeaderPrimary)}>
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.itemPrimary, }} >
            {messages.project_overview}
          </ListItemText>
        </ListItem>
        <Divider />
        {categories.map(({ id, icon, to, isVisible, children }) => (
          <React.Fragment key={id}>
            {to ?

              <ListItem className={clsx(classes.item, classes.categoryHeader, classes.itemClickable, history.location.pathname == to && classes.itemActiveItem)}
                component={(props) => <Link to={to} {...props} />}>
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText classes={{ primary: classes.categoryHeaderPrimary, }}  >
                  {messages[id] + (action && action.id == id && action.value != null ? ' (' + action.title + ')' : '')}
                </ListItemText>
                {action && action.id == id && action.value != null ?
                  <ListItemIcon className={classes.itemIconFinalize}>
                    <IconButton  className={classes.buttonIconFinalize} onClick={e => {e.stopPropagation();finilizeAction(action.id, action.value)}} >
                      <PowerOffIcon />
                    </IconButton>
                  </ListItemIcon> : <></>}
              </ListItem>
              :
              <ListItem className={clsx(classes.item, classes.categoryHeader)} >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText classes={{ primary: classes.categoryHeaderPrimary, }}  >
                  {messages[id]}
                </ListItemText>
              </ListItem>
            }

            { isVisible || (action && action.id == id && action.value != null) ?
              children.map(({ id: childId, to }) => (
                <ListItem key={childId} button className={clsx(classes.item, classes.itemClickable, history.location.pathname == to && classes.itemActiveItem)}
                  component={(props) => <Link to={to} {...props} />}>

                  <ListItemText classes={{ primary: classes.itemPrimary }} className={clsx(classes.categoryItem)} >
                    {messages[childId]}
                  </ListItemText>
                </ListItem>
              ))

              : <></>}

            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
