import React, { useState } from 'react'
import {Row, Col, Card, Form, Button} from 'react-bootstrap'
import { app } from '../firbaseInit'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import Loading from './Loading'
import AlertModal from './AlertModal'

const LoginPage = ({history}) => {
    const [isAlert, setIsAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const auth = getAuth(app);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email:'user01@email.com',
        password:'12341234'
    });
    const { email, password } = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        //로그인처리
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((success)=>{
            setLoading(false);
            sessionStorage.setItem('email', email);
            history.push('/');
        })
        .catch((error)=>{
            setLoading(false);
            setAlertMessage(error.message);
            setIsAlert(true);
        });
    }

    if(loading) return <Loading/>
    return (
    <>
        <Row className='justify-content-center'>
            <Col xl={5} md={6}>
                <Card className="m-5 p-3">
                    <Card.Title className='text-center'>
                        <h3>로그인</h3>
                    </Card.Title>
                    <Card.Body>
                        <Form onSubmit={onSubmit} className='text-center'>
                            <Form.Control 
                                onChange={onChange}
                                name="email" value={email}
                                placeholder='email' className='my-2'/>
                            <Form.Control
                                onChange={onChange}
                                name="password" value={password} type="password" 
                                placeholder='password' className='my-2'/>
                            <Button type="submit" className='my-2 px-5'>Login</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        { isAlert && <AlertModal message={alertMessage}/> }
    </>
    )
}

export default LoginPage