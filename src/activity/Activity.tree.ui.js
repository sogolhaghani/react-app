import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { makeStyles, lighten } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Tooltip from '@material-ui/core/Tooltip';
import PlusIcon from '@material-ui/icons/LibraryAdd';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from '@material-ui/lab/Alert';
import Divider from '@material-ui/core/Divider';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import { handleRequestSort, setPage, loadEntity, createEntity, loadChildren, close, deleteEntities, handleReadValidation } from './activity.actions'
import ConfirmDialog from '../common/Confirm.dialog';

function EnhanceAlert() {
  const dispatch = useDispatch()
  const validations = useSelector(state => state.activity.validations.filter(item => !item.read)) || [];

  const handleRead = (index) => {
    dispatch(handleReadValidation(index));
  }

  return (
    [
      validations.map((item, index) => { return <Alert onClose={() => handleRead(index)} key={index} severity={item.severity}>{item.message}</Alert> })
    ]
  )
}


function EnhancedTableHead(props) {
  const dispatch = useDispatch()

  const messages = useSelector(state => state.activity.messages) || {};
  const { classes, order, orderBy } = props;
  const createSortHandler = (property) => (event) => {
    dispatch(handleRequestSort(property))
  };

  return (
    <TableHead>
      <TableRow>

        <TableCell width="150px"></TableCell>
        <TableCell
          key={"id"}
          align={'left'}
          padding={'default'}
          sortDirection={orderBy === "id" ? order : false}
        >
          <TableSortLabel
            active={orderBy === "id"}
            direction={orderBy === "id" ? order : 'asc'}
            onClick={createSortHandler("id")}
          >
            {messages.id}
            {orderBy === "id" ? (
              <span className={classes.visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell
          key={"name"}
          align={'left'}
          padding={'default'}
          sortDirection={orderBy === "name" ? order : false}
        >
          <TableSortLabel
            active={orderBy === "name"}
            direction={orderBy === "name" ? order : 'asc'}
            onClick={createSortHandler("name")}
          >
            {messages.name}
            {orderBy === "name" ? (
              <span className={classes.visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell
          key={"code"}
          align={'left'}
          padding={'default'}
          sortDirection={orderBy === "code" ? order : false}
        >
          <TableSortLabel
            active={orderBy === "code"}
            direction={orderBy === "code" ? order : 'asc'}
            onClick={createSortHandler("code")}
          >
            {messages.code}
            {orderBy === "code" ? (
              <span className={classes.visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell width="50px">
          
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  }
}));

const initialState = {
  mouseX: null,
  mouseY: null,
};

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const messages = useSelector(state => state.activity.messages) || {};
  const modelId = useSelector(state => state.base.action.value);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCreate = () => {
    dispatch(createEntity(null, modelId, null))
    history.push('/activity/form')
  }


  return (
    <Toolbar className={clsx(classes.root)}>
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">

      </Typography>
      <Tooltip title={messages.new_entity}>
        <IconButton aria-label={messages.new_entity} onClick={handleCreate} >
          <PlusIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

const useRowStyles = makeStyles((theme) => ({
  root: {
    transition: 'all 0.1s ease-in'
  },
  open: {
    transform: 'rotate(90deg)',
  },
  icon: {
    marginRight: theme.spacing(1),
  }
}));

const EnhancedTableTRow = (props) => {
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const dispatch = useDispatch()
  const classes = useRowStyles();
  const lastUpdate = useSelector(state => state.activity.lastUpdate);
  const labelId = `enhanced-table-checkbox-${props.index}`;
  const children = props.row.children || [];
  const messages = useSelector(state => state.activity.messages) || {};
  const modelId = useSelector(state => state.base.action.value);
  const baseMessages = useSelector(state => state.base.messages) || {};
  const history = useHistory();
  const [state, setState] = React.useState(initialState);

  const handleClick = (event, id) => {
    event.stopPropagation()
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleClose = (e) => {
    e.stopPropagation()
    setState(initialState);
  };

  const openEdit = (event, id) => {
    dispatch(loadEntity(id));
    history.push('/activity/form')
  }

  const setOpen = (row, event) => {
    event.stopPropagation();
    if (!props.row.open)
      dispatch(loadChildren(row.id, row.level))
    else
      dispatch(close(row.id));
  }

  const handleCreate = (id,type, e) => {
    dispatch(createEntity(id, modelId, type));
    handleClose(e);
    history.push('/activity/form')
  }

  const handleDelete = (id, e) => {
    e.stopPropagation()
    dispatch(deleteEntities(id));
    handleClose(e);
    onCloseCofirmDialog(e);
  }

  const onOpenCofirmDialog = (e) => {
    e.stopPropagation()
    setOpenConfirm(true)
  }

  const onCloseCofirmDialog = (e) => {
    e.stopPropagation()
    setOpenConfirm(false)
  }

  return (
    <>
      <TableRow
        hover
        onClick={(event) => openEdit(event, props.row.id)}
        tabIndex={-1}
        key={props.row.id}
      >

        <TableCell style={{ paddingTop: (props.row.level * (-3) + 20), paddingBottom: (props.row.level * (-3) + 20) }}>
          {props.row.open && props.row.children.length == 0 ? <></> :
          <div style={{ marginRight: (props.row.level * 25 + 10)}} >
            <IconButton aria-label="expand row" size="small" onClick={(event) => setOpen(props.row, event)} >
              <ChevronLeft className={clsx(classes.root, props.row.open ? classes.open : '')} />
            </IconButton>
          </div> }
        </TableCell>

        <TableCell style={{ color: lighten('#18202c', props.row.level * 0.1) }} component="th" id={labelId} scope="row" padding="none">
          {props.row.id}
        </TableCell>
        <TableCell style={{ color: lighten('#18202c', props.row.level * 0.1) }} align="left">{props.row.name}</TableCell>
        <TableCell style={{ color: lighten('#18202c', props.row.level * 0.1) }} align="left">{props.row.code}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={(event) => handleClick(event)}>
            <MenuOpenIcon />
            <Menu
              keepMounted
              open={state.mouseY !== null}
              onClose={handleClose}
              anchorReference="anchorPosition"
              anchorPosition={
                state.mouseY !== null && state.mouseX !== null
                  ? { top: state.mouseY, left: state.mouseX }
                  : undefined
              }
            >
              <MenuItem onClick={e => handleCreate(props.row.id,props.row.type, e)} >
                <PlaylistAddIcon className={classes.icon} color="primary" />
                {messages.create_child}</MenuItem>
              <Divider />
              <MenuItem onClick={e => onOpenCofirmDialog(e)}>
                <DeleteSweepIcon className={classes.icon} color="secondary" />
                {messages.delete}
              </MenuItem>
              {/* <MenuItem>
                  {props.row.id}
                </MenuItem> */}
              <ConfirmDialog open={openConfirm}
                title={baseMessages.confirm_dialog_title}
                agree={baseMessages.agree}
                disAgree={baseMessages.disAgree}
                handleClose={e => onCloseCofirmDialog(e)}
                handleOnConfirm={e => handleDelete(props.row.id, e)}
                content={baseMessages.confirm_dialog_content} />
            </Menu>
          </IconButton>
        </TableCell>
      </TableRow>
      {props.row.open ? children.map((row, index) => {
        return (
          <EnhancedTableTRow key={index} row={row} index={index} open={row.open} />
        );
      }) : <></>}
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
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
  icon: {
    transform: 'rotatey(180deg)',
    marginRight: '15px'
  }
}));

export default function EnhancedTable() {
  const dispatch = useDispatch()

  const classes = useStyles();
  const order = useSelector(state => state.activity.table.order);
  const orderBy = useSelector(state => state.activity.table.orderBy);
  const list = useSelector(state => state.activity.table.list);
  const page = useSelector(state => state.activity.table.pageItem.page);
  const total = useSelector(state => state.activity.table.pageItem.total);
  const rowsPerPage = useSelector(state => state.activity.table.pageItem.rowsPerPage);
  const messages = useSelector(state => state.activity.messages) || {};
  const baseMessages = useSelector(state => state.base.messages) || {};
  const history = useHistory();

  const labelDisplayedRows = (from, to, count) => {
    return new Function(['from', 'to', 'count'], 'return `' + baseMessages.labelDisplayedRows + '`;')(from, to, count)
  }
  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage));
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, total - page * rowsPerPage);

  return (
    <>

      <Typography variant="h5" component="h4">
        <AccountTreeIcon className={clsx(classes.icon)} />
        {messages.entity}
      </Typography>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
        <Typography color="inherit">{baseMessages.base_information}</Typography>
        <Typography color="inherit">{messages.entity}</Typography>
        <Typography color="textPrimary">{baseMessages.list}</Typography>
      </Breadcrumbs>
      <EnhanceAlert />
      <Divider className={classes.divider} />

      <Paper className={classes.paper} elevation={0}>
        <EnhancedTableToolbar />
        <>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={total}
            />
            <TableBody>
              {list
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <EnhancedTableTRow key={index} row={row} index={index} open={row.open} />
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
        <TablePagination
          rowsPerPageOptions={[rowsPerPage]}
          component="div"
          count={total}
          labelDisplayedRows={({ from, to, count }) => labelDisplayedRows(from, to, count)}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
        />
      </Paper>
    </>
  );
}