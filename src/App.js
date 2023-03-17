import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import HeaderPage from './components/HeaderPage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import PostsPage from './components/PostsPage';
import ReadPage from './components/ReadPage';
import UpdatePage from './components/UpdatePage';
import { UserContext } from './components/UserContext';
import WritePage from './components/WritePage';


function App() {
    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value={{user, setUser}}>
            <div className="App">
                <HeaderPage/>
                <Switch>
                    <Route path="/" component={HomePage} exact={true}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/posts" component={PostsPage} exact={true}/>
                    <Route path="/posts/write" component={WritePage}/>
                    <Route path="/posts/:id" component={ReadPage} exact={true}/>
                    <Route path="/posts/update/:id" component={UpdatePage}/>
                </Switch>
            </div>
        </UserContext.Provider>
    );
}

export default App;
