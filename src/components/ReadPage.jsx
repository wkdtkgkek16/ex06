import React, { useEffect, useState } from 'react'
import { app } from '../firbaseInit'
import { getFirestore, getDoc, doc, deleteDoc } from 'firebase/firestore';
import Loading from './Loading';
import { Col, Row, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
const ReadPage = ({match, history}) => {
    const db = getFirestore(app);
    const id= match.params.id;
    const [post, setPost] = useState('');
    const [loading, setLoading] = useState(false);

    const getPost = async() => {
        setLoading(true);
        const result=await getDoc(doc(db, 'posts', id));
        console.log(result.data());
        setPost(result.data());
        setLoading(false);
    }

    const onDelete = async(id) => {
        if(!window.confirm(`${id}번 게시글을 삭제하실래요?`)) return;
        await deleteDoc(doc(db, 'posts', id));
        history.push('/posts')
    } 

    useEffect(()=>{
        getPost();
    }, []);

    if(loading) return <Loading/>
    return (
        <Row className='justify-content-center m-3'>
            <Col xl={8}>
                <h1>게시글정보</h1>
                {sessionStorage.getItem('email')=== post.email &&
                    <div>
                        <Link to={`/posts/update/${id}`}><Button>수정</Button></Link>
                        <Button className='m-2' onClick={()=>onDelete(id)}>삭제</Button>
                    </div>    
                }
                <hr/>
                <Card className='p-3'>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Body>
                        <p><b>{post.date}</b> | {post.email}</p>
                        <hr/>
                        <p>{post.body}</p>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default ReadPage