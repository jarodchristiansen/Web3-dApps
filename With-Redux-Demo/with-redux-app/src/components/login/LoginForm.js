import React, {useState, useEffect} from 'react'

import {Form, FormLabel, FormGroup, FormControl, Button, FormCheck} from "react-bootstrap";


const LoginForm = () => {

   const [email, setEmail] = useState();
   const [pass, setPass] = useState()
   const [signIn, setSignIn] = useState(true)


   const onSubmit = () => {
       console.log('this is email', email)
       console.log('this is password', pass)
   }


    return (
        <div>
        {signIn ? (
                <div>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(e) => setPass(e.target.value)} placeholder="Password" />
                        </Form.Group>

                        <Button variant="primary" onClick={() => onSubmit()}>
                            Submit
                        </Button>
                        <Button variant="primary" onClick={() => {
                            setEmail('')
                            setPass('')
                            setSignIn(false)
                        }}>
                            Sign Up
                        </Button>
                    </Form>
                </div>
            ): (
                <div>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(e) => setPass(e.target.value)} placeholder="Password" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" onChange={(e) => setPass(e.target.value)} placeholder="Password" />
                        </Form.Group>


                        <Button variant="primary" onClick={() => onSubmit()}>
                            Submit
                        </Button>
                        <Button variant="primary" onClick={() => setSignIn(true)}>
                            Sign In
                        </Button>
                    </Form>
                </div>
            )}
        </div>
    )
}

export default LoginForm