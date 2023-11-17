import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage/HomePage";
import SignUpFormPage from "./components/SignUpFormPage";
import {Switch, Route} from 'react-router-dom';
import ItemShow from "./components/Items/ItemShow";
import CartHomePage from "./components/CartItems/CartHomePage";

function App() {
  return(
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signup" component={SignUpFormPage} />
        <Route path="/login" component={LoginFormPage} />
        <Route path="/cart" component={CartHomePage} />
        <Route exact path="/items/:itemId" component={ItemShow} />
      </Switch>
    </>
  )
}

export default App;
