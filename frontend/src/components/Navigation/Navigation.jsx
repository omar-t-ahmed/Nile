import './Navigation.css';
import white_logo from '../images/nile-logo-transparent-white.png'
import { useSelector } from 'react-redux';

const Navigation = () => {
    const name = useSelector((state) => state.session.currentUser ? state.session.currentUser.name : 'Sign in')
    
    return (
        <nav>

        <div className="nav-logo">
            <img src={white_logo} alt="nile-logo"/>
        </div>

        <div className="search-bar">
        <input type="text" placeholder="Search"/>
        <select>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
        </select>
        </div>

        <div className='hello-message'>
            <p>hello {name}</p>
        </div>
    
        <div className="cart">
        <p>cart</p>
        </div>
    </nav>
    )
}

export default Navigation