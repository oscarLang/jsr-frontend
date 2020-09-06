import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Link, Route, Switch } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import "./App.css";
import Home from "../home/Home";
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
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const views = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "Reports",
      route: "/reports/week",
    },
  ];
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
          {views.map((view, index) => (
            <ListItem button component={Link} to={view.route} key={view.name}>
              <ListItemText inset dense primary={view.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/reports/week" component={Reports} />
      </Switch>
    </div>
  );
}
export default App;
