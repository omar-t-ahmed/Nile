import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage/HomePage";
import SignUpFormPage from "./components/SignUpFormPage";
import {Switch, Route} from 'react-router-dom';
import ItemShow from "./components/Items/ItemShow";
import CartHomePage from "./components/CartItems/CartHomePage";
import SucessfulShip from "./components/Shipping/SucessfullShip";
import LeaveReview from "./components/Reviews/LeaveReview";

function App() {
  return(
    <>
      <Switch>
        <Route exact path='/items/:itemId/review' component={LeaveReview}></Route>
        <Route exact path="/items/:itemId" component={ItemShow} />
        <Route path="/cart/shipping" component={SucessfulShip} />
        <Route path="/signup" component={SignUpFormPage} />
        <Route path="/login" component={LoginFormPage} />
        <Route path="/cart" component={CartHomePage} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </>
  )
}

export default App;
