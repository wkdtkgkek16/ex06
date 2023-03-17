import React, {useEffect, useState} from 'react'
import { Link, Route } from 'react-router-dom'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { app } from '../firbaseInit'
import { onSnapshot, getFirestore, doc, query, collection, orderBy } from 'firebase/firestore'
import Loading from './Loading'

const PostsPage = () => {
    const db = getFirestore(app);
    const [total, setTotal] = useState(0);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const getPosts = () => {
        setLoading(true);
        const q = query(collection(db, 'posts'), orderBy('date', 'desc'))
        onSnapshot(q, (result)=>{
            let rows=[];
            result.forEach(row=>{
                //console.log(row.id);
                rows.push({id:row.id, ...row.data()});
            });
            setTotal(rows.length);
            setPosts(rows);
            setLoading(false);
        });
    }

    useEffect(()=>{
        getPosts();
    }, []);

    if(loading) return <Loading/>
    return (
        <Row className='posts m-3 justify-content-center'>
            <Col xl={10}>
                {sessionStorage.getItem('email') &&
                    <>
                        <Link to="/posts/write">글쓰기</Link>
                        <hr />
                    </>
                }
                <h1>게시글목록</h1>
                <span>전체글수: {total}</span>
                {posts.map(post=>
                    <Card className='my-2' key={post.id}>
                        <Card.Body>
                            <h4>{post.title}</h4>
                            <p className='ellipsis'>{post.body}</p>
                            <Link to={`/posts/${post.id}`}><Button>Read More →</Button></Link>
                        </Card.Body>
                        <Card.Footer className='text-muted'>
                            Posted on {post.date} by {post.email}
                        </Card.Footer>
                    </Card>
                )}
            </Col>
        </Row>
    )
}

export default PostsPage