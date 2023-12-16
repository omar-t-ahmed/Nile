import React, { useState, useEffect } from 'react';
import './Navigation.css';
import white_logo from '../images/nile-logo-transparent-white.png';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import cart from '../images/cartIcon.png'
import { fetchItem, fetchItems, fetchSearchItems, updateSearchItems } from '../../store/items';

const Navigation = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [modalVisible, setModalVisible] = useState(false)

    const user = useSelector((state) => state.session.currentUser)
    const cart_items = useSelector((state) => state?.cart_items ? Object.values(state.cart_items) : [])

    let total_cart_items = 0
    cart_items.forEach((cart_item) => {total_cart_items += cart_item?.quantity})

    if (total_cart_items > 99) {
        total_cart_items = '99+'
    }

    const handleLogout = async () => {
        await dispatch(logout(user.id));
        history.push('/');
    };

    const cartRedirect = () => {
        if (user) {
            history.push('/cart')
        } else {
            history.push('/login')
        }
    }

    const sendSearch = () => {
        dispatch(updateSearchItems(searchQuery));
        setSearchResults([])
        setSearchQuery('')
    }

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const search = async () => {
        if (searchQuery) {
            const res = await dispatch(fetchSearchItems(searchQuery));
            const items = Object.values(res)
            debugger
            if (items) {
            setSearchResults(items.slice(0, 5));
            }
        } else {
            setSearchResults([]);
        }
        };
    
        search();
    }, [dispatch, searchQuery]);
    
    const handleInputChange = async (e) => {
        setSearchQuery(e.target.value);
    };

    const handleLogoClick = () => {
        history.push('/')
        dispatch(fetchItems())
    }

return (
    <div className="nav-container">
        <nav className="nav">
            <div className="nav-logo" onClick={handleLogoClick}>
                <img className="white-logo" src={white_logo} alt="nile-logo" />
            </div>
            <div className="search-bar">
                <select className='select-category'>
                        <option value="all">All Departments</option>
                        <option value="department-1">Department 1</option>
                </select>
                <div className="search-bar">
                <input
                className="search-input"
                type="text"
                placeholder="Search Nile"
                id="search-bar"
                value={searchQuery}
                onChange={handleInputChange}
                />

        {searchResults.length > 0 && (
                <div className="search-results-dropdown">
                {searchResults.map((result) => (
                    <div key={result.id} className="search-result-item" onClick={() => { 
                    history.push(`/items/${result.id}`) 
                    setSearchQuery('');
                    setSearchResults([]);
                    }}>
                    <span>{result.name}</span>
                    </div>
                ))}
                </div>
            )}
        </div>

                <div className='magnifying-glass' onClick={sendSearch}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                </div>
            </div>

            <div className='hello-message' onMouseEnter={() => setModalVisible(true)} onMouseLeave={() => setModalVisible(false)}>
                <p>Hello, {user ? user.name : 'sign in'}</p>
                <p className='account-lists'>Account & Lists</p>

                {modalVisible && (
                    !user ? (
                        <div className="modal">
                            <button className='sign-in-modal' onClick={() => { history.push('/login') }}>
                                Sign in
                            </button>
                            <p>New Customer? <Link to='/signup' className='link-tag'>Start here</Link></p>
                        </div>) : (
                            <div className="modal">
                                <button className='sign-in-modal' onClick={handleLogout}>
                                    Sign out
                                </button>
                            </div>
                        )
                )}
            </div>
            <div className="cart" onClick={cartRedirect}>
                    {total_cart_items < 10 ? (
                        <p className='cart-count-single-digit'>{total_cart_items}</p>
                    ) : total_cart_items < 100 ? (
                        <p className='cart-count-double-digit'>{total_cart_items}</p>
                    ) : (
                        <p className='cart-count-over-99'>{total_cart_items}</p>
                    )}
                <div className='cart-icon-container'>
                    <img className='nav-cart' src={cart} alt='cart-icon' />
                </div>
                <p>Cart</p>
            </div>
        </nav>
    </div>
    )
}

export default Navigation