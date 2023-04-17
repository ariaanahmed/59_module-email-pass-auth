import './Register.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { useState } from 'react';
const auth = getAuth(app)

const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = (event) => {
        event.preventDefault();
        setSuccess('')
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(name, email, password)

        if(!/(?=.*[0-9].*[0-9])/.test(password)){
            setError('at least two numbers');
            return;
        } else if(!/(?=.*[!@#$%^&*])/.test(password)){
            setError('at least one special character')
            return;
        }

        createUserWithEmailAndPassword(auth, email, password).then((result) => {
            const loggedUser = result.user;
            console.log(loggedUser)
            setError('');
            setSuccess('user registred successfully');
            event.target.reset();
            sendVerification(result.user)
            updateUserProfile(result.user, name)

        }).catch((error) => {
            console.error(error.message)
            setError(error.message)
        })

    }

    const sendVerification = (user) => {
        sendEmailVerification(user).then((result) => {
            console.log(result)
            alert('verify your email address')
        })
    }

const updateUserProfile = (user, name) => {
    updateProfile(user,{
        displayName: name,
    }).then(() => {
        console.log('user name updated')
    }).catch((error) => {
        setError(error.message)
    })
}

    return (
        <div className='w-25 mx-auto border px-3 py-1 mt-3'>

            <h4 className='regHeading'>
                please register
            </h4>

            <form onSubmit={handleRegister} className='register-container w-100 mx-auto'>

                <input type="text" required name="name" id="name" placeholder='Your name' />
                <br />

                <input type="email" required name="email" id="email" placeholder='Enter your email' />
                <br />

                <input type="password" required name="password" id="password" placeholder='Password' /> <br />

                <Button type='submit'>Register</Button>

                <p className='mx-auto'><small>Have an account?<Link to="/login">Login</Link></small></p>
            </form>
            <p><small>{error}</small></p>
            <p><small>{success}</small></p>
        </div>
    );
};

export default Register;