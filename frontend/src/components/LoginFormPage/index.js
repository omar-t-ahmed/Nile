import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import logo from '../images/nile-logo-transparent.png'
import './LoginForm.css';

function LoginFormPage() {
    const history = useHistory()
    const dispatch = useDispatch();

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(() => history.push('/'))
            .catch(async (res) => {
            let data;
            try {
                data = await res.clone().json();
            } catch {
                data = await res.text(); 
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
        });

    }

    return (
        <div className='form-container'>
        <img className='logo' src={logo} alt='nile logo'></img>
        <form onSubmit={handleSubmit}>
            <h1 className='sign-in'>Sign in</h1>
            {errors.length > 0 && (
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
            </ul>
            )}
            <div className='login-container'>
            <label>
                Email{' '}
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                />
            </label>
            <label>
                Password{' '}
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </label>
            </div>
            <button className='submit-button' type="submit">Sign in</button>
        </form>
        </div>
    );
}

export default LoginFormPage;