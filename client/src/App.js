import { ThemeProvider, createTheme } from "@material-ui/core";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { blue, green } from '@material-ui/core/colors';
// import history from "./@history";
import SignUpPage from './pages/auth/Signup';
import SignInPage from "./pages/auth/SignIn";
import Home from "./pages/dashboard/Home";
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
      light: blue[100],
      dark: blue[700]
    },
    secondary: {
      main: blue[300]
    },
    success: {
      main: green[400]
    }
  },
  typography: {
    "fontFamily": "Poppins",
  },
  overrides: {
    MuiTypography: {
      // color: '#787878'
    },
    '& *': {
      fontFamily: "Poppins",
    },
  }
})

const App = () => {

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={SignInPage} />
          </Switch>
          <Switch>
            <Route exact path="/signup" component={SignUpPage} />
          </Switch>
          <Switch>
            <Route exact path="/home" component={Home} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
