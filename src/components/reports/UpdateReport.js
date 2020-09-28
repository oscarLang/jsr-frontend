import React, { useEffect } from "react";
import axios from 'axios';
import {
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import {
  useParams,
  useHistory
} from "react-router-dom";
function UpdateReport() {
    const history = useHistory();
    let { number } = useParams();
    const [reportForm, changeForm] = React.useState({
      week: "",
      text: "",
    });
    useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await axios(
            process.env.REACT_APP_API + "/reports/week/" + String(number),
            {withCredentials: true}
          );
          console.log(result);
          changeForm({
            text: result.data.data.text,
            week: number,
          });
        } catch (error) {
          console.log("no data");
        }
      };
      fetchData();
    }, [number]);
    function change(event) {
        var name = event.target.name;
        var value = event.target.value;
        changeForm({ ...reportForm, [name]: value });
    }
    function submitReport(event) {
        event.preventDefault();
        console.log(reportForm);
        axios({
            method: 'put',
            url: process.env.REACT_APP_API + '/reports',
            withCredentials: true,
            data: {
              week: reportForm.week,
              text: reportForm.text
            }
        })
        .then(function (response) {
            console.log(response);
            history.push("/reports/week/" + String(number));
        });
    }

  return (
      <form onSubmit={submitReport}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              multiline
              fullWidth
              id="text"
              label="Text. Markdown supported"
              name="text"
              value={reportForm.text}
              onChange={change}
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary">
          Update report
        </Button>
      </form>
  );
}
export default UpdateReport;
