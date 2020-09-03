import React from "react";
import { Paper, Grid, List, ListItem, ListItemText, Divider } from "@material-ui/core";
import { Link, Route, Switch, useRouteMatch, useParams } from 'react-router-dom';

function ReportList() {
  let { path, url } = useRouteMatch();
  return (
      <Grid item xs={12} sm={4}>
        <Paper>
            <List>
            <Link to="/reports/week">
                <ListItem button key="0">
                    <ListItemText primary="Reports" />
                </ListItem>
            </Link>
            <Divider />
            <Link to={`${url}/1`}>
                <ListItem button key="1">
                    <ListItemText primary="Week 1" />
                </ListItem>
            </Link>
            <Link to={`${url}/2`}>
                <ListItem button key="2">
                    <ListItemText primary="Week 2" />
                </ListItem>
            </Link>
            </List>
        </Paper>
      </Grid>
  );
}
export default ReportList;
