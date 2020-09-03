import React from "react";
import {
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography
} from "@material-ui/core";
import {
  Link,
  Route,
  Switch,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import ReportList from "./ReportList";
function Week() {
  let { number } = useParams();
  console.log(number);
  const reports = [
      {
          number: "1",
          title: "Report week 1",
          text: "balaslald"
      }
  ]
  let thisReport = reports.find(week => week.number == number) ?? "none";
  return (
    <div>
        <Typography variant="h3">
            {thisReport.title}
        </Typography>
        <Typography variant="subtitle1">
            {thisReport.text}
        </Typography>
    </div>
  );
}
function Reports({ match }) {
  console.log(match);
  let { path, url } = useRouteMatch();
  console.log(path);
  console.log(url);
  return (
    <Grid container spacing={3}>
      <ReportList />
      <Grid item xs={12} sm={8}>
        <Paper>
          <Switch>
            <Route path="/reports/week/:number" children={<Week />} />
          </Switch>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default Reports;
