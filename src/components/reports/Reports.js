import React, { useEffect } from "react";
import Cookies from 'js-cookie'
import Markdown from "markdown-to-jsx";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import {
  Paper,
  Grid,
  Typography,
  List,
  ListItem,
  Divider,
  ListItemText,
  Button,
} from "@material-ui/core";
import {
  Route,
  Link,
  Switch,
  useRouteMatch,
  useParams,
  useHistory
} from "react-router-dom";
import CreateReport from "./CreateReport";
import UpdateReport from "./UpdateReport";
import "./Report.css";

function Week(props) {
    const history = useHistory();
    const isLoggedIn = Cookies.get("jwt") || false;
  const [weekData, changeWeek] = React.useState({
    data: "###Report has not been created yet",
    created: false,
  });
  let { number } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          process.env.REACT_APP_API + "/reports/week/" + String(number),
          {withCredentials: true }
        );
        changeWeek({
          data: result.data.data.text,
          created: true,
        });
      } catch (error) {
        changeWeek({
          data: "###Report has not been created yet",
          created: false,
        });
        console.log("no data");
      }
    };
    fetchData();
  }, [number]);
  function deleteReport(event) {
      event.preventDefault();
      axios({
        method: 'delete',
        withCredentials: true,
        url: process.env.REACT_APP_API + '/reports',
        data: {
          week: number,
        }
    })
    .then(function (response) {
        console.log(response);
        history.push("/reports/week");
    });
  }
  function updateReport(event) {
      history.push("/reports/week/update/" + String(number));
  }
  return (
    <div>
      {weekData.created && isLoggedIn && (
        <Grid item xs={12}>
          <Button
            id="updateReport"
            size="small"
            variant="contained"
            color="primary"
            onClick={updateReport}
            startIcon={<UpdateIcon />}
          >
            Update
          </Button>
          <Button
            id="deleteReport"
            size="small"
            onClick={deleteReport}
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Grid>
      )}
      <Markdown id="textData" children={weekData.data} />
    </div>
  );
}
function Info() {
  return (
    <div>
      <Typography variant="h3">Reports</Typography>
    </div>
  );
}

function Reports({ match }) {
  let {url } = useRouteMatch();
  const isLoggedIn = Cookies.get("jwt") || false;
  return (
    <Grid container spacing={3} className="Report-main">
      <Grid item xs={12} sm={4}>
        <Paper>
          <List>
            <ListItem button component={Link} to="/reports/week" key="0">
              <ListItemText primary="Reports" />
            </ListItem>
            <Divider />
            <ListItem component={Link} to={`${url}/1`} button id="week1" key="1">
              <ListItemText primary="Week 1" />
            </ListItem>
            <ListItem component={Link} to={`${url}/2`} button id="week2" key="2">
              <ListItemText primary="Week 2" />
            </ListItem>
            <ListItem component={Link} to={`${url}/3`} button id="week3" key="3">
              <ListItemText primary="Week 3" />
            </ListItem>
            <ListItem component={Link} to={`${url}/4`} button id="week4" key="4">
              <ListItemText primary="Week 4" />
            </ListItem>
            <ListItem component={Link} to={`${url}/5`} button id="week5" key="5">
              <ListItemText primary="Week 5" />
            </ListItem>
            <ListItem component={Link} to={`${url}/6`} button id="week6" key="6">
              <ListItemText primary="Week 6" />
            </ListItem>
            <Divider />
            { isLoggedIn &&
                <ListItem id="createReport" button component={Link} to="/reports/week/create" key="7">
                    <ListItemText primary="Create new report" />
                </ListItem>
            }
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Paper className="Report-paper">
          <Switch>
            <Route exact path="/reports/week" children={<Info />} />
            <Route
              exact
              path="/reports/week/create"
              children={<CreateReport />}
            />
            <Route
              path="/reports/week/update/:number"
              children={<UpdateReport />}
            />
            <Route
              path="/reports/week/:number"
              children={<Week text="test" />}
            />
          </Switch>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default Reports;
