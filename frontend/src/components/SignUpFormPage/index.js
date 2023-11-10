import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
// import LoginFormPage from '../LoginFormPage';
import logo from '../images/nile-logo-transparent.png'
import './SignUpForm.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function SignUpFormPage() {
    const history = useHistory()
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        if (password === confirmPassword) {
            return dispatch(sessionActions.signup({ name, email, password }))
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
            })
        }
        return setErrors(['Passwords must Match']);
    }

    return (
        <>
        <img className='logo' src={logo} alt='nile logo'></img>
        <form className='sign-up' onSubmit={handleSubmit}>
            <h1 className='sign-in'>Create an account</h1>
            {errors.length > 0 && (
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
            )}
            <div className='login-container'>

            <label>
                Your name
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>

            <label>
                Email{' '}
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>

            <label>
                Password
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </label>

            <label>
                Re-enter Password
                <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </label>
        </div>
        
        <button className='submit-button' type="submit">Sign up</button>

        <p className='redirect-user-accounts'>Already have an account? <Link to='/login' className='link-tag'>Sign in</Link></p>
        </form>
        </>
    );
}

export default SignUpFormPage;