import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const RegistryRBS = () => {

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password)
    }


    return (
        <div className='mx-auto w-25 border p-4 rounded mt-5'>
            <h4 className='text-muted text-center mb-4'>Welcom to registration!!</h4>
            <Form onSubmit={handleOnSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control name='email' type="email" placeholder="Enter your email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control name='password' type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Terms & Conditions" />
                </Form.Group>
                <Button variant="primary w-100" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default RegistryRBS;