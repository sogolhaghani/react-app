import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import theme from  './theme'
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Navigator from './Navigator';
import Header from './Header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import OstanList from '../ostan/Ostan.container';
import OstanForm from '../ostan/Ostan.edit.ui';
import ActivityList from '../activity/Activity.container';
import ScenarioActionList from '../scenariomodel/ScenarioModel.container';
import ActivityForm from '../activity/Activity.edit.ui';
import ScenarioActionForm from '../scenariomodel/ScenarioModel.edit.ui';

import OrganizationLevelList from '../organizationlevel/OrganizationLevel.container';
import OrganizationLevelForm from '../organizationlevel/OrganizationLevel.edit.ui';

import LevelGradeList from '../levelgrade/LevelGrade.container';
import LevelGradeForm from '../levelgrade/LevelGrade.edit.ui';

import OrganizationUnitList from '../organizationunit/OrganizationUnit.container';
import OrganizationUnitForm from '../organizationunit/OrganizationUnit.edit.ui';

import DriversList from '../drivers/Drivers.container';
import DriversForm from '../drivers/Drivers.edit.ui';

import StrategyList from '../strategy/Strategy.container';
import StrategyForm from '../strategy/Strategy.edit.ui';

import ShahrList from '../shahr/Shahr.container';
import ShahrForm from '../shahr/Shahr.edit.ui';


import ProductList from '../product/Product.container';
import ProductForm from '../product/Product.edit.ui';

import ResourceList from '../resource/Resource.container';
import ResourceForm from '../resource/Resource.edit.ui';

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

const drawerWidth = 300;

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
    width: '100%'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#eaeff1',
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1',
  },
};

function Paperbase(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (

    <ThemeProvider theme = {theme}>
      <BrowserRouter>

        <div className={classes.root} dir="rtl">
          <CssBaseline />
          <nav className={classes.drawer} dir="rtl">
            <Hidden smUp implementation="js">
              <Navigator

                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
              />
            </Hidden>
            <Hidden xsDown implementation="css">
              <Navigator PaperProps={{ style: { width: drawerWidth } }} active={props.active}/>
            </Hidden>
          </nav>
          <div className={classes.app}>
            <Header onDrawerToggle={handleDrawerToggle} />
            <main className={classes.main}>
              <Switch>
                
                <Route path='/ostan/list' component={OstanList} />
                <Route path='/ostan/form' component={OstanForm} />
                <Route path='/model/list' component={ScenarioActionList} />
                <Route path='/model/form' component={ScenarioActionForm} />
                <Route path='/activity/list' component={ActivityList} />
                <Route path='/activity/form' component={ActivityForm} />

                <Route path='/organizationLevel/list' component={OrganizationLevelList} />
                <Route path='/organizationLevel/form' component={OrganizationLevelForm} />

                <Route path='/shahr/list' component={ShahrList} />
                <Route path='/shahr/form' component={ShahrForm} />

                <Route path="/levelGrade/list" component={LevelGradeList} />
                <Route path="/levelGrade/form" component={LevelGradeForm} />

                <Route path="/organizationUnit/list" component={OrganizationUnitList} />
                <Route path="/organizationUnit/form" component={OrganizationUnitForm} />

                <Route path="/drivers/list" component={DriversList} />
                <Route path="/drivers/form" component={DriversForm} />

                <Route path="/strategy/list" component={StrategyList} />
                <Route path="/strategy/form" component={StrategyForm} />

                <Route path="/product/list" component={ProductList} />
                <Route path="/product/form" component={ProductForm} />

                <Route path="/resource/list" component={ResourceList} />
                <Route path="/resource/form" component={ResourceForm} />

              </Switch>
            </main>
            <footer className={classes.footer}>
              <Copyright />
            </footer>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

Paperbase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Paperbase);
