import React from "react";
import axios from 'axios';
import {
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  MenuItem
} from "@material-ui/core";
import {
  useHistory
} from "react-router-dom";
function CreateReport() {
    const history = useHistory();
    const [reportForm, changeForm] = React.useState({
      week: "",
      text: "",
    });
    const weeks = [1,2,3,4,5,6];
    function change(event) {
        var name = event.target.name;
        var value = event.target.value;
        changeForm({ ...reportForm, [name]: value });
    }
    function submitReport(event) {
        event.preventDefault();
        console.log(reportForm);
        axios({
            method: 'post',
            url: 'http://localhost:1337/reports',
            data: {
              week: reportForm.week,
              text: reportForm.text
            }
        })
        .then(function (response) {
            console.log(response);
            history.push("/reports/week/" + String(reportForm.week));
        });
    }

  return (
      <form onSubmit={submitReport}>
        <Grid container>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            required
            select
            fullWidth
            id="week"
            label="Choose which week"
            name="week"
            value={reportForm.week}
            onChange={change}
          >
            {weeks.map((week) => (
                <MenuItem key={week} value={week}>
                    {week}
                </MenuItem>
            ))}
          </TextField>
        </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              multiline
              id="text"
              label="Text. Markdown supported"
              name="text"
              value={reportForm.text}
              onChange={change}
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary">
          Submit report
        </Button>
      </form>
  );
}
export default CreateReport;
