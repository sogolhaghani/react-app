import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
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
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import PlusIcon from '@material-ui/icons/LibraryAdd';
import SettingIcon from '@material-ui/icons/Settings';

import Alert from '@material-ui/lab/Alert';
import Divider from '@material-ui/core/Divider';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { handleRequestSort, setPage, loadEntity, createEntity, deleteEntities, settingHandler, handleReadValidation, lockModel } from './scenariomodel.actions'
import ConfirmDialog from '../common/Confirm.dialog';

function EnhanceAlert() {
  const dispatch = useDispatch()
  const validations = useSelector(state => state.scenarioModel.validations.filter(item => !item.read)) || [];

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

  const headCells = useSelector(state => state.scenarioModel.headCells) || []
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount } = props;
  const createSortHandler = (property) => (event) => {
    dispatch(handleRequestSort(property))
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox color="default"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ?
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
              : <span>{headCell.label}</span>}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight: {
    color: theme.palette.primary.light,
  },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const classes = useToolbarStyles();
  const { selected } = props;
  const messages = useSelector(state => state.scenarioModel.messages) || {};
  const baseMessages = useSelector(state => state.base.messages) || {};
  const history = useHistory();

  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteEntities(selected));
    props.onDelete();
    onCloseCofirmDialog();
  }

  const handleCreate = () => {
    dispatch(createEntity())
    history.push('/model/form')
  }

  const onOpenCofirmDialog = () => {
    setOpenConfirm(true)
  }

  const onCloseCofirmDialog = () => {
    setOpenConfirm(false)
  }


  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: selected.length > 0,
      })}
    >
      {selected.length > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {selected.length} {messages.selected}
        </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          </Typography>
        )}

      {selected.length > 0 ? (
        <>
        <Tooltip  title={baseMessages.deleteItems}>
          <IconButton aria-label="delete" onClick={onOpenCofirmDialog} >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <ConfirmDialog open={openConfirm}
        title={baseMessages.confirm_dialog_title}
        agree={baseMessages.agree}
        disAgree={baseMessages.disAgree}
        handleClose={onCloseCofirmDialog}
        handleOnConfirm={deleteHandler}
        content={baseMessages.confirm_dialog_content} />
        </>
      ) : (
          <Tooltip title={messages.new_entity} >
            <IconButton aria-label={messages.new_entity} onClick={handleCreate} >
              <PlusIcon />
            </IconButton>
          </Tooltip>
        )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
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

}));

export default function EnhancedTable() {
  const dispatch = useDispatch()

  const classes = useStyles();
  const order = useSelector(state => state.scenarioModel.table.order);
  const orderBy = useSelector(state => state.scenarioModel.table.orderBy);
  const list = useSelector(state => state.scenarioModel.table.list);
  const page = useSelector(state => state.scenarioModel.table.pageItem.page);
  const total = useSelector(state => state.scenarioModel.table.pageItem.total);
  const rowsPerPage = useSelector(state => state.scenarioModel.table.pageItem.rowsPerPage);
  const [selected, setSelected] = React.useState([]);
  const messages = useSelector(state => state.scenarioModel.messages) || {};
  const baseMessages = useSelector(state => state.base.messages) || {};
  const history = useHistory();
 
  const labelDisplayedRows = (from, to, count) => {
    return new Function(['from', 'to', 'count'], 'return `' + baseMessages.labelDisplayedRows + '`;')(from, to, count)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const clearSelected = () => {
    setSelected([]);
  }

  const openEdit = (event, id) => {
    dispatch(loadEntity(id));
    history.push('/model/form')
  }

  const handleClick = (event, name) => {
    event.stopPropagation()
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage));
  };
  // TODO : change size
  const handleChangeRowsPerPage = (event) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(setPage(0));
  };

  const handleSetting = (id, name, event) => {
    event.stopPropagation();
    dispatch(settingHandler(id, name));
    dispatch(lockModel(id));
    history.push('/home')

  }

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, total - page * rowsPerPage);

  return (
    <>
<Typography variant="h5" component="h4">
        {messages.entity}
      </Typography>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
        <Typography color="inherit">{baseMessages.base_information}</Typography>
        <Typography color="inherit">{messages.entity}</Typography>
        <Typography color="textPrimary">{baseMessages.list}</Typography>
      </Breadcrumbs>
      <EnhanceAlert />
      <Divider className={classes.divider} />
      <Paper className={classes.paper}>
        <EnhancedTableToolbar selected={selected} onDelete={clearSelected} />
        <>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={Math.min(rowsPerPage, total - page * rowsPerPage)}
            />
            <TableBody>
              {list
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => openEdit(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox  color="default"
                          onClick={(event) => handleClick(event, row.id)}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="td" id={labelId} scope="row" padding="none">
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.code}</TableCell>
                      <TableCell align="right">

                        <IconButton onClick={e => handleSetting(row.id, row.name, e)} >
                          <SettingIcon />
                        </IconButton>


                      </TableCell>
                    </TableRow>
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
          rowsPerPage={rowsPerPage}
          page={page}
          labelDisplayedRows={({ from, to, count }) => labelDisplayedRows(from, to, count)}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}








