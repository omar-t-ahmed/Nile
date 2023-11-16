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

const Navigation = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [modalVisible, setModalVisible] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const user = useSelector((state) => state.session.currentUser)

    useEffect(() => {
        setLoggedIn(!!user);
    }, [user])

    const handleLogout = async () => {
        await dispatch(logout(user.id))
        setLoggedIn(false)
        history.push('/')
    }

    return (
        <div className="nav-container">
            <nav className="nav">
                <div className="nav-logo">
                    <img src={white_logo} alt="nile-logo" />
                </div>
                <div className="search-bar">
                <select className='select-category'>
                        <option value="all">All Departments</option>
                        <option value="department-1">Department 1</option>
                    </select>
                    <input className='search-input' type="text" placeholder="Search Nile" />
                    <div className='magnifying-glass'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                    </div>
                </div>
                <div className='hello-message' onMouseEnter={() => setModalVisible(true)} onMouseLeave={() => setModalVisible(false)}>
                    <p>Hello, {loggedIn ? user.name : 'sign in'}</p>
                    <p className='account-lists'>Account & Lists</p>

                    {modalVisible && (
                        !loggedIn ? (
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

                <div className="cart">
                    <p className='cart-count'>0</p>
                    <div className='cart-icon-container'>
                        <img src={cart} alt='cart-icon' />
                    </div>
                    <p>Cart</p>
                </div>
            </nav>
        </div>
    );
}

export default Navigation;