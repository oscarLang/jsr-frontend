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
  Divider
} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import "./Message.css";


function Message({message}) {
     let isDivider = message.id === "newerMessages";
     console.log(isDivider);
     return (
        <Grid container key={message.id}>
        { isDivider ? (
            <Grid className="Divider-red" container alignItems="center" justify="center" key={message.id}>
                <Grid item xs={8}>
                    <Divider/>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="overline">
                        new messages
                    </Typography>
                </Grid>
            </Grid>


         ) : (
            <Grid container key={message.id}>
                <Grid item xs={1}>
                    <Avatar >{message.user.substring(0,1)}</Avatar>
                    </Grid>
                <Grid item xs={11}>
                    <Typography variant="h6">
                        {message.user + " " + message.time}
                    </Typography>
                    <Typography variant="subtitle1">
                        {message.text}
                    </Typography>
                </Grid>
            </Grid>
        )}
        </Grid>
     );
}
export default Message;
