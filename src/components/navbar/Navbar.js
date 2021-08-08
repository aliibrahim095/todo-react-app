import React from 'react';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function Navbar() {
  const classes = useStyles();
  const history=useHistory()
  const goHome=(e)=>{
      e.preventDefault();
      history.push('/');
  }
  const goInProgress=(e)=>{
      e.preventDefault();
      history.push('/inprogress');
  }
  const goCompleted=(e)=>{
      e.preventDefault();
      history.push('/completed');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            TODO
          </Typography>
          <Button onClick={goHome} color="inherit">Home</Button>
          <Button onClick={goInProgress} color="inherit">In Progress</Button>
          <Button onClick={goCompleted} color="inherit">Completed</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
