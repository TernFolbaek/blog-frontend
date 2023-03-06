import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MyPosts from './MyPosts';
import Home from './Home';
import Login from './Login';
import SignUp from './Signup';
import Navbar from './Navbar';
import Post from './Post';
const App = () => {
  const [user, setUser] = useState('');

  const handleUserId = (id) => {
    setUser(id);
  };

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home id={user} />} />
        <Route path='/my-posts' element={<MyPosts id={user} />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/login' element={<Login handleUserId={handleUserId} />} />
      </Routes>
    </div>
  );
};

export default App;
