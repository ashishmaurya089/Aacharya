import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
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
import { countries } from "./LoginForm";

import logo from "./logo.png";
import useStyles from "./styles";

export default function SignUpForm(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [name, setname] = useState("");
  const [surname, setsurname] = useState("");
  const [gender, setgender] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [countryCode, setcountryCode] = useState("91");
  const [referralCode, setreferralCode] = useState("");
  const [agree, setagree] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  // const [showReferral,setShowReferral]=useState(false);
  const [currency, setCurrency] = useState("EUR");

  const handleCurrency = (event) => {
    setCurrency(event.target.value);
  };
  const handleGender = (e) => {
    setgender(e.target.value);
  };
  const handleSignup = () => {
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else if (agree !== true) {
      toast.error("Allow agree");
    } else {
      dispatch(
        userSignUp(
          name,
          // surname,
          email,
          countryCode,
          Number(phoneNumber),
          password,
          referralCode,
          props.history
        )
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} alt="logo" className={classes.logo} />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <div className={`${classes.form} mb-5`}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={name}
                onChange={(e) => setname(e.target.value)}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth={true}
                id="firstName"
                label="Full Name"
                autoFocus
              />
            </Grid>
            {/* <Grid item xs={6}>
							<TextField
								value={surname}
								onChange={(e) => setsurname(e.target.value)}
								autoComplete='lname'
								name='lastName'
								variant='outlined'
								required
								fullWidth={true}
								id='lastName'
								label='Last Name'
								autoFocus
							/>
						</Grid> */}
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
            <Grid item xs={4} sm={4}>
              <TextField
                id="outlined-select-currency-native"
                select
                label="Country"
                value={countryCode}
                onChange={(e) => setcountryCode(e.target.value)}
                fullWidth={true}
                SelectProps={{
                  native: true,
                }}
                variant="outlined"
              >
                {countries.map((option, i) => (
                  <option key={i} value={option.phone}>
                    {option.code} +{option.phone}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={8} sm={8}>
              <TextField
                value={phoneNumber}
                onChange={(e) => setphoneNumber(e.target.value)}
                variant="outlined"
                required
                fullWidth={true}
                type="Number"
                label="Phone Number"
                autoComplete="phoneNumber"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                className="my-2"
                variant="outlined"
                fullWidth={true}
                required
              >
                <InputLabel htmlFor="outlined-adornment-password">
                 Set Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setshowPassword(!showPassword)}
                        onMouseDown={(event) => event.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={80}
		  
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                className="my-2"
                variant="outlined"
                fullWidth={true}
                required
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setshowPassword(!showPassword)}
                        onMouseDown={(event) => event.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={140}
                />
              </FormControl>
            </Grid>
	    
            <Grid item xs={12}>
	    {/* <FormControl
                className="my-2"
                variant="outlined"
                fullWidth={true}
                required
              >
                <InputLabel htmlFor="ref-code">
		Referral Code
                </InputLabel>
                <OutlinedInput
                  id="ref-code"
                  type={showReferral ? "text" : "password"}
                  value={referralCode}
                  onChange={(e) => setreferralCode(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowReferral(!showReferral)}
                        onMouseDown={(event) => event.preventDefault()}
                        edge="end"
                      >
                        {showReferral ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={140}
                />
              </FormControl> */}
              <TextField
                value={referralCode}
                onChange={(e) => setreferralCode(e.target.value)}
                fullWidth={true}
                id="outlined-basic"
                label="Referal Code (Optional)"
                variant="outlined"
              />
            </Grid>
            {/* <Grid item xs={12}>
							<FormControl component='fieldset'>
								<FormLabel component='legend'>Gender</FormLabel>
								<RadioGroup
									aria-label='gender'
									name='gender'
									value={gender}
									onChange={handleGender}
									className={classes.gender}
								>
									<FormControlLabel
										value='male'
										control={<Radio />}
										label='Male'
									/>
									<FormControlLabel
										value='female'
										control={<Radio />}
										label='Female'
									/>
								</RadioGroup>
							</FormControl>
						</Grid> */}
            <Grid item xs={12} className="d-flex align-items-center">
              <FormControlLabel
                control={
                  <Checkbox
                    value="allowExtraEmails"
                    color="primary"
                    checked={agree}
                    onChange={(e) => setagree(e.target.checked)}
                  />
                }
                label="Agree to our"
              />
              <Typography color="primary" className="mb-2">
                <Link
                  to={{ pathname: "https://aacharya.net/terms-conditions" }}
                  target="_blank"
                  rel="noopener"
                  className={classes.anchor}
                >
                  terms and conditions{" "}
                  <i className="fas fa-external-link-alt"></i>
                </Link>
              </Typography>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => handleSignup()}
          >
            Sign Up
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
