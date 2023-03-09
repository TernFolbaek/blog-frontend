import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = ({ id }) => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState('');

  useEffect(() => {
    getPosts();
    setUser(id);
  }, []);

  const getPosts = () => {
    fetch('http://localhost:2000/api/global-posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
      <div id='home-title'>
        <h1>Feed</h1>
      </div>
      <div id='global-posts'>
        {posts.map((post) => (
          <$Link to={`/post/${post._id}`} key={Math.random()}>
            <div id={post._id} className='post' >
              <h1>{post.title}</h1>
              <hr />
              <h3>{post.text}</h3>
              <h4>{formatDate(post.timeStamp)}</h4>
            </div>
          </$Link>
        ))}
      </div>
    </div>
  );
};

const $Link = styled(Link)`
  text-decoration: none;
  color: black;
`;

export default Home;
