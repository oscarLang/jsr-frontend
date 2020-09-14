import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from 'js-cookie'
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Divider
} from "@material-ui/core";
import { Link, Route, Switch } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

import "./App.css";
import Home from "../home/Home";
import Login from "../user/Login";
import Register from "../user/Register";
import Reports from "../reports/Reports";
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

function App() {
  const classes = useStyles();
  const [drawer, setOpen] = React.useState(false);
  const isLoggedIn = Cookies.get("jwt") || false;
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={handleDrawerOpen}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            JSRamverk
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" open={drawer} onClose={handleDrawerClose}>
        <List>
            <ListItem button component={Link} to="/" key="home">
                <ListItemText inset dense primary="Home"/>
            </ListItem>
            <ListItem button component={Link} to="/reports/week" key="reports">
                <ListItemText inset dense primary="Reports"/>
            </ListItem>
            <Divider />
            {
                isLoggedIn === false &&
                (<ListItem button component={Link} to="/login" key="login">
                    <ListItemText inset dense primary="Log in"/>
                </ListItem>)
            }
            {
                isLoggedIn === false &&
                (<ListItem button component={Link} to="/register" key="register">
                    <ListItemText inset dense primary="Register"/>
                </ListItem>)
            }
        </List>
      </Drawer>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/reports/week" component={Reports} />
      </Switch>
    </div>
  );
}
export default App;
