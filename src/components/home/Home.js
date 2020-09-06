import React from "react";
import {
  Grid,
  Typography,
} from "@material-ui/core";
import "./Home.css";
import me from "../../static/me.jpg";
function App() {
  return (
    <div id="home" className="Home">
      <Grid container>
        <Grid item xs={12} sm={4} className="MePresentation">
          <Typography variant="h4">Welcome!</Typography>
          <Typography variant="body1">
            My name is Oscar and this is my website for the course "jsramverk".
            In this course we will take a deeper look at the "Big Three"
            framworks for javascript development.
          </Typography>
          <Typography variant="body1">
            I just started my third and last year at the program. I have
            previously done some projects in Vue and will now try and work with
            React.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <div>
            <img src={me} alt="Me" width="300" height="400" className="Me" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
