import React, { useContext, useEffect, useState } from 'react'
import back from '../images/back.jpg'
import {Navbar, Container, Nav} from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { UserContext } from './UserContext'
import { app } from '../firbaseInit'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import Loading from './Loading'

const HeaderPage = ({history}) => {
    const db = getFirestore(app);
    const {user, setUser} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const getUser = async() => {
        setLoading(true);
        const result=await getDoc(doc(db, 'users', sessionStorage.getItem('email')));
        setUser(result.data());
        setLoading(false);
    }

    useEffect(()=>{
        if(sessionStorage.getItem('email')) getUser();
    }, [sessionStorage.getItem('email')]);

    const onLogout = (e) =>{
        e.preventDefault();
        sessionStorage.removeItem('email');
        setUser(null);
        history.push('/');
    }

    if(loading) return <Loading/>
    return (
        <div className='header'>
            <img src={back} width="100%" />
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Link to="/">Home</Link>
                        <Link to="/posts">게시글</Link>
                        {sessionStorage.getItem('email') ? 
                            <Link to="/logout" onClick={onLogout}>로그아웃</Link>
                            :
                            <Link to="/login">로그인</Link>
                        }
                    </Nav>
                    {(user && user.name) && <Link to="mypage">{user.name}</Link>}
                    {(user && user.photo) && <img src={user.photo} 
                                    style={{width:'30px',borderRadius:'50%'}}/>}
                </Container>
            </Navbar>
        </div>
    )
}

export default withRouter(HeaderPage)