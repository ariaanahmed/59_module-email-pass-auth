import React from 'react';
import './Register.css'

const Register = () => {

    const handleFromSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password)
    }
// method of onChange
    const handleEmailChange = (event) =>{
        console.log(event.target.value)
    }
// method of onBlur
    const handlePassword = (event) => {
            console.log(event.target.value)
    }
    return (
        <div>
            <h4 className='regHeading'>please register</h4>
            <form onSubmit={handleFromSubmit} className='register-container'>
                <input onChange={handleEmailChange} type="email" name="email" id="email" placeholder='Enter you email' />
                <br />
                <input onBlur={handlePassword} type="password" name="password" id="password" placeholder='Password' /> <br />
                <button type='submit'>Register</button>
            </form>
        </div>
    );
};

export default Register;