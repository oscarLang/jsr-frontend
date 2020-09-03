import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Drawer, List, Divider, ListItem,ListItemText, Button, AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
import { Link, Route, Switch } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import './App.css';
import Home from './Home';
import Reports from './Reports';
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
		  route: "/"
	  },
	  {
		  name: "Reports",
		  route: "/reports/week"
	  }
  ]
  return (
	  <div>
	  <AppBar position="static" color="transparent">
        <Toolbar>
      		<IconButton onClick={handleDrawerOpen} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        		<MenuIcon />
      		</IconButton>
      		<Typography variant="h6" className={classes.title}>
        		JSRamverk
      		</Typography>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Login</Button>
      		<Button color="inherit">Login</Button>
    	</Toolbar>
  	  </AppBar>
      <Drawer variant="temporary" open={drawer} onClose={handleDrawerClose}>
		  <List>
	        {views.map((view, index) => (
				<Link to={view.route}>
	          		<ListItem button key={view.name}>
	            		<ListItemText primary={view.name} />
	          		</ListItem>
			  	</Link>
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
