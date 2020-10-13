import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  List,
  Paper,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Avatar,
  TextField,
  Divider,
  Button
} from "@material-ui/core";
import {
  useHistory
} from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import "./Display.css";

function Connect({socket}) {
    const history = useHistory();
    const [nickForm, changeForm] = React.useState();
    function change(event) {
        var value = event.target.value;
        changeForm(value);
    }
    function setNick(event) {
        let now = new Date();
        let obj = {
            time: now.toLocaleTimeString('sv-SE'),
            user: nickForm
        };
        socket.emit('user connected', obj);
        localStorage.setItem('nick', nickForm);
        history.push("/chat");
    }
    return (
      <Grid container>
          <Grid item xs={12}>
            <Paper elevation={3}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="nick"
                  label="Choose your nick"
                  type="text"
                  id="nick"
                  value={nickForm || ""}
                  onChange={change}
                />
                <Button id="setNick" fullWidth variant="contained" color="primary" onClick={setNick}>
                    Confirm nickname
                </Button>
            </Paper>
          </Grid>
      </Grid>
    );
}

export default Connect;
