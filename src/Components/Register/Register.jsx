import React from 'react';
import './Register.css'

import app from '../../firebase/firebase.config';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
const auth = getAuth(app)

const Register = () => {

    const handleOnChange = (event) =>{
        event.preventDefault()
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password)

        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const loggedInUser = userCredential.user;
            console.log(loggedInUser)
        }).catch((error) => {
            console.error(error);
        })
    }


    return (
        <div>
            <h4 className='regHeading'>please register</h4>
            <form onSubmit={handleOnChange} className='register-container'>
                <input type="email" name="email" id="email" placeholder='Enter you email' />
                <br />
                <input type="password" name="password" id="password" placeholder='Password' /> <br />
                <button type='submit'>Register</button>
            </form>
        </div>
    );
};

export default Register;