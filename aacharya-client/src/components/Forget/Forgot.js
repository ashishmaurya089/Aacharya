import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link ,useHistory} from 'react-router-dom';
import {
    Container,
    Typography,
    Grid,
    Checkbox,
    FormControlLabel,
    TextField,
    CssBaseline,
    FormControl,
    Button,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Phone as PhoneIcon } from '@material-ui/icons';
import { emailLogin, loginWithPhone } from '../../actions/registrationActions';
import logo from '../Registration/logo.png';
import useStyles from '../Registration/styles';
import { toast } from "react-toastify";
import { ForgotChangePassword } from '../../actions/userActions';

export default function Forgot(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [password, setpassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [otp, setotp] = useState('');

    const [showPassword, setshowPassword] = useState(false);

    const { forgotPassDetail } = useSelector((state) => state.usersData);

    console.log(forgotPassDetail)

    const handleChangePassword = () => {
        debugger
        if (otp == '' && password == "" && confirmPassword == "") {
            toast.error("Please fill in all required fields!!");
        } else {
            if (password !== confirmPassword) {
                toast.error("Password do not match!!");
            } else {
                if (forgotPassDetail && forgotPassDetail.user.otp == otp) {
                    let forgotDetail = {
                        email: forgotPassDetail && forgotPassDetail.user.email,
                        password: confirmPassword,
                        otp: parseInt(otp),
                    }
                    dispatch(ForgotChangePassword(forgotDetail))
                    history.push('/');
                }
                else {
                    toast.error("Please Enter valid OTP!!");
                }
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img src={logo} alt="logo" className={classes.logo} />
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                <div className={`${classes.form} mb-5`}>
                    <Grid container spacing={2}>


                        <Grid item xs={12}>
                            <TextField
                                value={otp}
                                onChange={(e) => setotp(e.target.value)}
                                variant='outlined'
                                margin='normal'
                                required
                                fullWidth={true}
                                label='Enter OTP here'
                                type='number'
                                autoFocus
                                className='my-2'
                                maxlength='4'
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
                                    labelWidth={110}

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


                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => handleChangePassword()}
                    >
                        Change Password
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
