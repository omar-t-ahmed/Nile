import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage/HomePage";
import {Switch, Route} from 'react-router-dom';

function App() {
  return(
    <>
      <Switch>
        <Route path="/login" component={LoginFormPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </>
  )
}

export default App;
