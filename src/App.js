import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {Grid, Paper, makeStyles, Link, Button } from "@material-ui/core";

function App() {
  const [data, setData] = useState([]);
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  const classes = useStyles();
  useEffect(() => {
    fetch("https://cm-spin.herokuapp.com/").then(x =>x.json()).then(data => setData(data));
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       
      </header>
      <div style={{marginTop:'20px'}}>
      <Button variant="contained" color="primary">
      Hello World
    </Button>

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
    </div>
  );
}

export default App;
