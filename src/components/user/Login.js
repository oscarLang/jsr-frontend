import React from "react";
import axios from 'axios';

import {
  Grid,
  Typography,
  Avatar,
  TextField,
  Button,
  Link,
} from "@material-ui/core";

import {
  useHistory
} from "react-router-dom";

function Login() {
    const history = useHistory();
    const [form, changeForm] = React.useState({
      email: "",
      password: "",
      logInFail: false
    });
    function change(event) {
        var name = event.target.name;
        var value = event.target.value;
        changeForm({ ...form, [name]: value });
    }
    function loginUser(event) {
        console.log(form);
      event.preventDefault();
      axios({
        method: 'post',
        url: process.env.REACT_APP_API + '/user/login',
        withCredentials: true,
        credentials: 'include',
        data: {
          email: form.email,
          password: form.password
        }
    })
    .then(function (response) {
        
        console.log(response);
        history.push("/")
    })
    .catch(function(err) {
        console.log(err);
        changeForm({ ...form, ["logInFail"]: true });
    });

    }
  return (
    <Grid container>
      <Grid item xs={12} sm={4}>
        <div>
          <Avatar />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          { form.logInFail &&
              <Typography color="secondary" component="h1" variant="h5">
              Log in failed
              </Typography>
          }
          <form onSubmit={loginUser}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={form.email}
              onChange={change}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={form.password}
              onChange={change}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Login;
