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
import "./Display.css";

function Display({nick, socket}) {
    const [messages, addMessage] = React.useState([]);

    const [newMessage, changeMessage] = React.useState({
      text: "",
    });

    useEffect(() => {
        socket.on("chat message", obj => {
            addMessage(messages => [ ...messages, obj]);
        });
        socket.on("user connected", obj => {
            addMessage(messages => [ ...messages, obj]);
        });
    }, [socket]);

    function updateMessageText(event) {
        event.preventDefault();
        var value = event.target.value;
        changeMessage({ ...newMessage, text: value });
    }

    function keyPress(event){
        if(event.keyCode == 13){
            let now = new Date();
            let obj = {
                time: now.toLocaleTimeString('sv-SE'),
                text: newMessage.text,
                user: nick
            };
            console.log(obj);
            socket.emit('chat message', obj);
            changeMessage({ ...newMessage, text: "" });
        }
   }
  return (
      <Grid container>
          <Grid item xs={12}>
            <Paper elevation={3}>
                <Typography variant="h2" gutterBottom>
                    Me chat
                </Typography>
                {messages && messages.map((message) => (
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
                ))}
                <Divider />
                <TextField
                        id="new"
                        label="Write something!"
                        value={newMessage.text || ""}
                        onChange={updateMessageText}
                        onKeyDown={keyPress}/>
            </Paper>
          </Grid>
      </Grid>
  );
}

export default Display;
