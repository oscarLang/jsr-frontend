import React from "react";
import {
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import {
  Link,
  useRouteMatch
} from "react-router-dom";
function ReportList() {
  let { url } = useRouteMatch();
  return (
    <Grid item xs={12} sm={4}>
      <Paper>
        <List>
          <ListItem button component={Link} to="/reports/week" key="0">
            <ListItemText primary="Reports" />
          </ListItem>
          <Divider />
          <ListItem component={Link} to={`${url}/1`} button key="1">
            <ListItemText primary="Week 1" />
          </ListItem>
          <ListItem component={Link} to={`${url}/2`} button key="2">
            <ListItemText primary="Week 2" />
          </ListItem>
        </List>
      </Paper>
    </Grid>
  );
}
export default ReportList;
