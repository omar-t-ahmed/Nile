import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
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
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
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
                    if (data?.errors) {
                        setErrors(data.errors.reduce((acc, error) => {
                            acc[error.split(' ')[0].toLowerCase()] = error;
                            return acc;
                        }, {}));
                    } else if (data) {
                        setErrors({ general: data });
                    } else {
                        setErrors({ general: res.statusText });
                    }
                })
        } else {
            setErrors({ password: 'Passwords must match' });
        }
    }

    return (
        <>
            <div className='form-container'>
                <img onClick={() => {history.push('/')}} className='logo' src={logo} alt='nile logo'></img>
                <form className='sign-up' onSubmit={handleSubmit}>
                    <h1 className='sign-in'>Create an account</h1>
                    <div className='login-container'>
                        <label>
                            Your name
                            <input className='amazon-font'
                                type="text"
                                value={name}
                                placeholder="First and last name"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </label>

                        <label>
                            Email{' '}
                            <input className='amazon-font'
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {errors.email && (
                                <div className="error-message">
                                    {errors.email}
                                </div>
                            )}
                        </label>

                        <label>
                            Password
                            <input className='amazon-font'
                                type="password"
                                value={password}
                                placeholder="At least 6 characters"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && (
                                <div className="error-message">
                                    {errors.password}
                                </div>
                            )}
                        </label>

                        <label>
                            Re-enter Password
                            <input className='amazon-font'
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {errors.password && (
                                <div className="error-message">
                                    {errors.password}
                                </div>
                            )}
                        </label>
                    </div>
        
                    <button className='submit-button' type="submit">Sign up</button>

                    <p className='redirect-user-accounts'>Already have an account? <Link to='/login' className='link-tag'>Sign in</Link></p>
                </form>
            </div>
        </>
    );
}

export default SignUpFormPage;