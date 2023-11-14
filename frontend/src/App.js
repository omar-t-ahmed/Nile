import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage/HomePage";
import SignUpFormPage from "./components/SignUpFormPage";
import {Switch, Route} from 'react-router-dom';
import ItemShow from "./components/Items/ItemShow";

function App() {
  return(
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signup" component={SignUpFormPage} />
        <Route path="/login" component={LoginFormPage} />
        <Route exact path="/items/:itemId" component={ItemShow} />
      </Switch>
    </>
  )
}

export default App;
