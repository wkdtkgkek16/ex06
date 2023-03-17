import React, { useRef, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import moment from 'moment'
import {app} from '../firbaseInit'
import {getFirestore, collection, addDoc} from 'firebase/firestore'
import ConfirmModel from './ConfirmModel'

const WritePage = ({history}) => {
    const db = getFirestore(app);
    const ref_title = useRef(null);
    const ref_body = useRef(null);

    const [question, setQuestion] = useState({
        show: false,
        title:'',
        message:'',
        action: null
    });

    const [form, setForm] = useState({
        title:'',
        body:''
    });
    const { title, body } = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(title === '') {
            alert('제목을 입력해 주세요!');
            ref_title.current.focus();
        }else if(body === '') {
            alert('내용을 입력해 주세요!');
            ref_body.current.focus();
        }else{
            if(!window.confirm('저장하실래요?')) return;
            const data={
                title: title,
                body: body,
                email: sessionStorage.getItem('email'),
                date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            }
            addDoc(collection(db, 'posts'), data);
            setForm({
                title:'',
                body:''
            });
            history.push('/posts');
        }
    }

    return (
        <>
        <Row className='justify-content-center'>
            <Col xl={8} className="m-3">
                <h1>글쓰기</h1>
                <Form className='text-center p-4' onSubmit={onSubmit}>
                    <Form.Control placeholder='제목을 입력하세요.'
                        name="title" value={title} onChange={onChange}
                        ref={ref_title}
                        className='my-3'/>
                    <Form.Control placeholder='내용을 입력하세요.' 
                        name="body" value={body} onChange={onChange}
                        as="textarea" rows={10} 
                        ref={ref_body}
                        className='my-3'/>
                    <Button type="submit" className='px-5'>글저장</Button>
                </Form>
            </Col>
        </Row>
            {question.show && <ConfirmModel question={question}/>}
        </>
    )
}

export default WritePage