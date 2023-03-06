import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MyPosts = ({ id }) => {
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setUser(id);
  }, []);

  useEffect(() => {
    loadPosts();
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setPosts([...posts, { title: title, text: text, user: user }]);

    fetch('http://localhost:2000/api/create-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        text,
        user,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const loadPosts = () => {
    if (user.length <= 0) {
      return;
    }

    fetch('http://localhost:2000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
      }),
    })
      .then((response) => response.json())
      .then((data) => setPosts([...posts, ...data.post_list]))
      .catch((error) => console.error(error));
  };

  const formatDate = (date) => {
    return date.substring(0, 10);
  };

  return (
    <div>
      {user.length !== 0 ? (
        <div id='loggedIn'>
          <div className='newPost'>
            <form className='form' onSubmit={handleSubmit}>
              <h1>New Post</h1>
              <br />
              <input
                className='input'
                type='text'
                value={title}
                placeholder='Title'
                onChange={(event) => setTitle(event.target.value)}
              />
              <br />
              <textarea
                className='input'
                rows='10'
                cols='40'
                type='text'
                maxLength='200'
                value={text}
                placeholder='Text'
                onChange={(event) => setText(event.target.value)}
              />
              <br />
              <button type='submit'>Submit</button>
            </form>
          </div>
          <h1 className='center'>Your Posts</h1>

          <div id='my-posts'>
            {posts.map((post) => (
              <div className='post' key={Math.random()}>
                <h1>{post.title}</h1>
                <hr />
                <h3>{post.text}</h3>
                <h4>{formatDate(post.timeStamp)}</h4>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <$LinkContainer>
          <$Link to='/login'>Log In</$Link>
          <h4>Log In to see your prior blogs :D</h4>
        </$LinkContainer>
      )}
    </div>
  );
};

const $LinkContainer = styled.div`
  margin-top: 10%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;
const $Link = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 30px;
  display: flex;
  width: fit-content;
  border-bottom: 2px solid black;
`;
export default MyPosts;
