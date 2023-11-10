import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage/HomePage";
import SignUpFormPage from "./components/SignUpFormPage";
import {Switch, Route} from 'react-router-dom';

function App() {
  return(
    <>
      <Switch>
      <Route path="/signup" component={SignUpFormPage} />
        <Route path="/login" component={LoginFormPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </>
  )
}

export default App;
