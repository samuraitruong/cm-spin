import React, { useState, useEffect } from 'react';
import './App.css';
import {Grid, Button, makeStyles, Link, Container, Box} from "@material-ui/core";
import Progress from "@material-ui/core/CircularProgress"
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RefreshIcon from '@material-ui/icons/Refresh';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowRight from '@material-ui/icons/ArrowRightAlt';
import Divider from '@material-ui/core/Divider';
import CheckIcon from '@material-ui/icons/Check'
import moment from "moment";
// or
function App() {
  const json = localStorage.getItem("COLLECTED") || "{}";
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);
  const [collected, setCollected] = useState(JSON.parse(json));
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    mainContent: {
      marginTop: theme.spacing(2)
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
    },
    row: {
      marginBottom: theme.spacing(1)
    }
  }));
  const classes = useStyles();
  useEffect(() => {
    if(data.length > 0) return;

    fetch("https://cm-spin.herokuapp.com/").then(x =>x.json()).then(data => setData(data));
  });
  return (
    <Container className="App">
      <AppBar position="static" container="true">
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
      <Container className={classes.mainContent}>
      

     { data.length ===0 && <Box display="flex" alignItems="center" justifyContent="center" height ="75vmin"><Progress  variant="indeterminate" status="loading...."></Progress></Box>}
      {data.map(x => (
      <Grid container spacing={0} className={classes.row} key={x.id}>
        <Grid item xs={5}>
          <Typography className={classes.paper}>{x.name}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.paper}>{moment(x.datetime, "DD-MM-YYYY").format("DD-MMM")}</Typography>
        </Grid>
        <Grid item xs={4} style= {{textAlign: "right"}}  >
          <Link component="a" 
            onClick={() => {
              collected[x.id] = true;
              setCollected(collected);
              localStorage.setItem("COLLECTED", JSON.stringify(collected));
              console.log(collected);

              return false;
            }}
          target="_blank" color="primary" href={x.url}>
          <Button spacing={2}
              variant="contained"
              color={collected[x.id]? "primary": "secondary"}
              size="small"
              className={classes.button}
              startIcon={collected[x.id]?<CheckIcon />: null}
              endIcon={!collected[x.id]?<ArrowRight />: null}
            >{collected[x.id]?"Collected": "Collect"}</Button>
        </Link>
        </Grid>
        <Grid xs={12} item>
        <Divider component="hr"></Divider>

        </Grid>
      </Grid>))}
      </Container>
      <Divider component="hr"></Divider>
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
    </Container>
    
  );
}

export default App;
