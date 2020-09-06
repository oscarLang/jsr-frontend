import React from "react";
import {
  Paper,
  Grid,
  List,
  Link as MaLink,
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
import Week1 from "./Week1"
function Week() {
  let { number } = useParams();
  const reports = [
      {
          number: "1",
          title: "Report week 1",
          text: Week1,
      }
  ]
  let thisReport = reports.find(week => week.number == number) ?? "none";
  return (
    <div>
        <Typography variant="h3">
            {thisReport.title}
        </Typography>
        <Typography variant="h4">
        <MaLink href="https://github.com/oscarLang/jsr-frontend">
            Github link
        </MaLink>
        </Typography>
        <Typography variant="subtitle1" component={thisReport.text}>
        </Typography>
    </div>
  );
}
function Info() {
  return (
    <div>
        <Typography variant="h3">
            Reports
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
            <Route exact path="/reports/week" children={<Info />} />
            <Route path="/reports/week/:number" children={<Week />} />
          </Switch>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default Reports;
