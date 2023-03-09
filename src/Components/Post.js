import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

const Post = () => {
  const [post, setPost] = useState('');
  const [comment, setComment] = useState('');

  const getPost = (id) => {
    fetch('http://localhost:2000/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPost(data.post[0]);
      })
      .catch((error) => console.error(error));


  };

  const url = useParams();
  getPost(url.id);

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = url.id;

    alert('in creation');
    fetch('http://localhost:2000/api/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        comment,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log('nice'))
      .catch((error) => console.log('not nice'));
  };


  return (
    <div className='center'>
      <div>
        <div className='post-details'>
          <h1>{post.title}</h1>
          <h3>{post.text}</h3>
          <div>
            <h3>comments:</h3>
            {post.comments}
          </div>
          <h4>{post.timeStamp}</h4>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />

        <br />

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};
export default Post;
