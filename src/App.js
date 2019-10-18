import React, { useState, useEffect } from 'react';
import './App.css';
import {Grid, Paper, makeStyles, Link} from "@material-ui/core";
import Progress from "@material-ui/core/CircularProgress"
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RefreshIcon from '@material-ui/icons/Refresh';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    marginTop: {
      marginTop: theme.spacing(2),
    }
  }));
  const classes = useStyles();
  useEffect(() => {
    if(data.length > 0) return;

    fetch("https://cm-spin.herokuapp.com/").then(x =>x.json()).then(data => setData(data));
  });
  return (
    <div className="App">
      <header className="App-header">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Coin Master Daily Rewards
          </Typography>
          <IconButton color="inherit" onClick={() => {
             setData([]);
             fetch("https://cm-spin.herokuapp.com/").then(x =>x.json()).then(data => setData(data));
          }} ><RefreshIcon/></IconButton>
        </Toolbar>
      </AppBar>

      </header>
      <div style={{marginTop:'20px'}}>
      

     { data.length ===0  && <Progress variant="indeterminate" spacing={20} container ></Progress>}
      {data.map(x => (
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>{x.name}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>{x.datetime}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Link  component="a" variant="contained"  target="_blank" color="primary" href={x.url}>
            Collect
        </Link>
        </Grid>
      </Grid>))}
      </div>
      {data.length >0 && ( <BottomNavigation className={classes.marginTop}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          setData([]);
          fetch("https://cm-spin.herokuapp.com/").then(x =>x.json()).then(data => setData(data));
        }}
        showLabels
      >
        <BottomNavigationAction label="Refresh" icon={<RefreshIcon />} />
      </BottomNavigation>)}
    </div>
    
  );
}

export default App;
