import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, useHistory } from 'react-router-dom';
import {
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Container,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { userSignUp } from "../../actions/registrationActions";
import { ForgotPassword } from "../../actions/userActions";
import logo from '../Registration/logo.png';
import useStyles from '../Registration/styles';

export default function EnterEmail(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setemail] = useState("");




  const handleForgot = async () => {
    debugger
    let data = await dispatch(ForgotPassword({ email }))
    console.log(data)
    if (data != undefined) {
      history.push('/forgot');
    }

  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} alt="logo" className={classes.logo} />
        <Typography component="h1" variant="h5">
          Enter Your Email
        </Typography>
        <div className={`${classes.form} mb-5`}>
          <Grid container spacing={2}>


            <Grid item xs={12}>
              <TextField
                value={email}
                onChange={(e) => setemail(e.target.value)}
                variant="outlined"
                required
                fullWidth={true}
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
              />
            </Grid>




          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleForgot}
          >
            Next
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2" className={classes.anchor}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
}
