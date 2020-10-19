import React, { useEffect } from "react";
import axios from 'axios';
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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import "./Display.css";
import Message from "./Message"

function Display({nick, socket}) {
    const [messages, addMessage] = React.useState([]);
    const [numberOfOldMessages, changeNumberOfOld] = React.useState(5);

    const [newMessage, changeMessage] = React.useState({
      text: "",
    });
    useEffect(() => {
        axios({
            method: 'get',
            url: process.env.REACT_APP_API + '/chat'
        })
        .then(function (response) {
            console.log(response.data);
            response.data.slice(0).reverse().map(function(oldMessage) {
                if (oldMessage._id) {
                    oldMessage.id = oldMessage._id;
                }
                oldMessage.old = true;
                addMessage(messages => [ ...messages, oldMessage]);
            });
            let systemMessage = {
                id: "newerMessages",
                text: "Newer messages",
                user: "System"
            };
            addMessage(messages => [ ...messages, systemMessage]);
        });
    }, []);
    useEffect(() => {
        socket.on("chat message", obj => {
            addMessage(messages => [ ...messages, obj]);
        });
        socket.on("user connected", obj => {
            addMessage(messages => [ ...messages, obj]);
        });
    }, [socket]);

    function loadOldMessages(event) {
        axios({
            method: 'get',
            url: process.env.REACT_APP_API + '/chat?skip=' + numberOfOldMessages + '&limit=5'
        })
        .then(function (response) {
            console.log(response.data);
            response.data.map(function(oldMessage) {
                if (oldMessage._id) {
                    oldMessage.id = oldMessage._id;
                }
                oldMessage.old = true;
                addMessage(messages => [ oldMessage, ...messages]);
            });
        });
        changeNumberOfOld(numberOfOldMessages + 5);
    }

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
            socket.emit('chat message', obj);
            changeMessage({ ...newMessage, text: "" });
            axios({
                method: 'post',
                url: process.env.REACT_APP_API + '/chat',
                data: obj
            })
            .then(function (response) {
                console.log(response);
            });
        }
   }


  return (
      <Grid container>
          <Grid item xs={12}>
            <Paper className="alignContent" elevation={3}>
                <Typography variant="h2" gutterBottom>
                    Me chat
                </Typography>
                <Button onClick={loadOldMessages}>
                    <AutorenewIcon/>
                    Load older messages
                </Button>
                <Divider />
                <div >{
                    messages.map((message) => (
                        <Message message={message} key={message.id}/>
                    ))
                }</div>
                <Divider />
                <TextField
                        id="new"
                        fullWidth
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
