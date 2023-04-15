import React, { useState } from 'react';
import './Register.css';

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import app from '../../firebase/firebase.config';

const auth = getAuth(app)

const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')
    const handleOnChange = (event) => {
        event.preventDefault();
        setSuccess('')
        setError('')
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password)

        if (!/(?=.*[A-Z])/.test(password)) {
            setError('please add atleast one uppercase');
            return;
        } else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setError('please add at least two numbers')
            return;
        } else if (password.length < 6) {
            setError('please add at least 6 characters in your password')
            return;
        }
        createUserWithEmailAndPassword(auth, email, password).then((result) => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setError('');
            event.target.reset();
            setSuccess('user has been created')


        }).catch((error) => {
            console.error(error.message)
            setError(error.message)
        })
    }
    return (
        <div>
            <h4 className='regHeading'>please register</h4>
            <form onSubmit={handleOnChange} className='register-container'>
                <input type="email" required name="email" id="email" placeholder='Enter you email' />
                <br />
                <input type="password" required name="password" id="password" placeholder='Password' /> <br />
                <button type='submit'>Register</button>
            </form>
            <p className='text-center'>{error}</p>
            <p className='text-center'>{success}</p>
        </div>
    );
};

export default Register;