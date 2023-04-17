import { getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.config';
import { useRef, useState } from 'react';

const auth = getAuth(app)
const Login = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const emailRef = useRef()


    const handleLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password)
        setError('')
        setSuccess('')

        signInWithEmailAndPassword(auth, email, password).then((result) => {
            const loggedUser = result.user;
            console.log(loggedUser)
            if(!loggedUser.emailVerified){
                alert('not verified mail')
                return
            }
            setSuccess('user logged in successfully!')
            setError('');

        }).catch((error) => {
            console.log(error.message)
            setError(error.message)
        })
    }

    const handleResetPassword = () => {
        const email = emailRef.current.value;
        if(!email){
            alert('please provide email address to reset password')
            return;
        }

        sendPasswordResetEmail(auth, email).then(() => {
            alert('check your email')
        }).catch((error) => {
            console.log(error.message);
            setError(error.message);
        })
    }

    return (
        <div className='mx-auto w-25 border p-3 mt-5'>
            <h2>
                Please Login
            </h2>
            <Form onSubmit={handleLogin}>
                <FormGroup className="mb-3" controlId="formBasicEmail">
                    <FormLabel>Email</FormLabel>
                    <FormControl type="email" name='email' ref={emailRef} required placeholder="Enter email" />
                </FormGroup>

                <FormGroup className="mb-3" controlId="formBasicPassword">
                    <FormLabel>Password</FormLabel>
                    <FormControl type="password" name='password' required placeholder="Password" />
                </FormGroup>

                <FormGroup className="mb-3" controlId="formBasicCheckbox">
                    <FormCheck type="checkbox" label="Remember me" />
                </FormGroup>
                <Button variant="primary w-100" type="submit">LogIn</Button>
            </Form>
            <p>{error}</p>
            <p>{success}</p>
            <p><small>
                <button onClick={handleResetPassword} className='btn btn-link'>Fogotten password?</button>
            </small></p>
            <p>
                <small>New to the website? please <Link to="/register">Register</Link></small>
            </p>
        </div>
    );
};

export default Login;