import React from "react";
import axios from 'axios';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import {
  useHistory
} from "react-router-dom";
// import "./Home.css";
function Register() {
    const history = useHistory();
  const [form, changeForm] = React.useState({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = React.useState({
    userName: false,
    email: false,
    password: false,
  });
  const [helper, setHelperText] = React.useState({
    userName: "",
    email: "",
    password: "",
  });
  function registerUser(event) {
    event.preventDefault();
    axios({
      method: 'post',
      url: process.env.REACT_APP_API + '/user/register',
      withCredentials: true,
      data: {
          username: form.userName,
          email: form.email,
          password: form.password
      }
    }).then(function (response) {
        console.log(response);
        history.push("/")
    });
  }

  function validate(event) {
    var toValidateName = event.target.name;
    var toValidateValue = event.target.value;
    switch (toValidateName) {
      case "userName":
        if (toValidateValue.length <= 2) {
            setError({ ...error, [toValidateName]: true });
            setHelperText({ ...helper, [toValidateName]: "Username must contain more than one character" });
        } else {
          setError({ ...error, [toValidateName]: false });
          setHelperText({ ...helper, [toValidateName]: "" });

        }
        break;
      case "email":
        // eslint-disable-next-line
        const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(toValidateValue)) {
          setError({ ...error, [toValidateName]: true });
          setHelperText({ ...helper, [toValidateName]: "Incorect format for email address" });
        } else {
          setError({ ...error, [toValidateName]: false });
          setHelperText({ ...helper, [toValidateName]: "" });
        }
        break;
      case "password":
        // eslint-disable-next-line
        const regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/i;
        if (!regPass.test(toValidateValue)) {
          setError({ ...error, [toValidateName]: true });
          setHelperText({ ...helper, [toValidateName]: "Password must contain a minimum of 8 characters, including on uppercase, one digit and one lowercase" });
        } else {
          setError({ ...error, [toValidateName]: false });
          setHelperText({ ...helper, [toValidateName]: "" });
        }
        break;
      default:
        break;
    }
    //https://stackoverflow.com/questions/59813926/usestate-to-update-multiple-values-in-react
    changeForm({ ...form, [toValidateName]: toValidateValue });
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={2}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={registerUser}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="Username"
                autoFocus
                error={error.userName}
                onChange={validate}
                value={form.userName}
                helperText={helper.userName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={error.email}
                onChange={validate}
                value={form.email}
                helperText={helper.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={error.password}
                onChange={validate}
                value={form.password}
                helperText={helper.password}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

export default Register;
