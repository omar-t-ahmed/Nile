import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../images/nile-logo-transparent.png';
import './LoginForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

function LoginFormPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const loggedIn = useSelector(state => state.session.currentUser);

    if (loggedIn) {
        history.push('/');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        try {
            await dispatch(sessionActions.login({ credential, password }));
            history.push('/');
        } catch (res) {
            let data;
            try {
                data = await res.clone().json();
            } catch {
                data = await res.text();
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
        }
    };

    const handleDemoLogin = async () => {
        try {
            await dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'demopassword' }));
            history.push('/');
        } catch (res) {
            console.error('Demo login failed');
        }
    };

    return (
        <div className='form-container'>
            <img className='logo' src={logo} alt='nile logo'></img>
            {errors.length > 0 && (
                    <div className='error-box'>
                        <FontAwesomeIcon className='error-triangle' icon={faTriangleExclamation} size='xl' />
                        {errors}
                    </div>
                )}
                
            <form onSubmit={handleSubmit}>
                <h1 className='sign-in'>Sign in</h1>
                <div className='login-container'>
                    <label>
                        Email{' '}
                        <input
                            type='text'
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                        />
                    </label>
                    <label>
                        Password{' '}
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button className='submit-button' type='submit'>
                    Sign in
                </button>
                <button className='demo-button' onClick={handleDemoLogin}>
                Login as Demo User
            </button>
            </form>

            <p className='new-to-nile'>New to Nile?</p>
            <button
                className='redirect-to-signup'
                onClick={() => {
                    history.push('/signup');
                }}
            >
                Create your Nile account
            </button>
        </div>
    );
}

export default LoginFormPage;