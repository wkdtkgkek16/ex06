import React, {useEffect, useRef, useState} from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { app } from '../firbaseInit'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'
import moment from 'moment'

const UpdatePage = ({match, history}) => {
    const db = getFirestore(app);
    const id = match.params.id;
    const ref_title = useRef(null);
    const ref_body = useRef(null);
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
            if(!window.confirm('수정하실래요?')) return;
            updateDoc(doc(db, 'posts', id), {
                title:title,
                body: body,
                email: sessionStorage.getItem("email"),
                data: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            });
            history.push('/posts')
        }
    }

    const getPost = async() => {
        const result = await getDoc(doc(db, 'posts', id));
        setForm(result.data());
    }

    useEffect(()=>{
        getPost();
    }, []);

    return (
        <Row className='justify-content-center'>
        <Col xl={8} className="m-3">
            <h1>게시글수정</h1>
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
                <Button type="submit" className='px-5'>글수정</Button>
            </Form>
        </Col>
    </Row>
    )
}

export default UpdatePage