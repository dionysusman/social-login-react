import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { loginUser } from '../../store/actions/user';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import AppleLogin from 'react-apple-login'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  mt_4: {
    marginTop: '20px'
  }
}));

export default function SignInPage() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch(null);
  const history = useHistory();
  const errors = useSelector(state => state.errors);
  const { isAuthenticated } = useSelector(state => state.auth);

  const { REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_FACEBOOK_CLIENT_ID, REACT_APP_APPLE_CLIENT_ID } = process.env;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/home');
    }
  }, [isAuthenticated])

  const onSubmit = data => {
        dispatch(loginUser(data));
  }

  const handleLoginSuccessWithGoogle = (response) => {
    history.push('/home');
  }
  const handleLoginFailureWithGoogle = (response) => {
      alert("Failed to login with Google")
  }

  const responseFacebook = (response) => {
    console.log(response);
    history.push('/home');
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
          <TextField
            {...register("email", { required: true })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={errors.email && true}
            helperText={errors.email}
          />
          <TextField
            {...register("password", { required: true })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={errors.password && true}
            helperText={errors.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link to="/" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link to="/signup">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} className={clsx(classes.mt_4, "btn_google_login")}>
              <GoogleLogin
                  clientId={REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText="Sign in with Google"
                  onSuccess={handleLoginSuccessWithGoogle}
                  onFailure={handleLoginFailureWithGoogle}
                  cookiePolicy={'single_host_origin'}
                  fullWidth
                />            
            </Grid>
            <Grid item xs={12} className={clsx(classes.mt_4, "btn_apple_login")}>
              <AppleLogin clientId={REACT_APP_APPLE_CLIENT_ID} redirectURI="http://localhost:3000/home" />
            </Grid>
            <Grid item xs={12} className={clsx(classes.mt_4, "btn_facebook_login")}>
              <FacebookLogin
                appId={REACT_APP_FACEBOOK_CLIENT_ID}
                autoLoad={true}
                fields="name,email,picture"
                // onClick={componentClicked}
                callback={responseFacebook} />
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}