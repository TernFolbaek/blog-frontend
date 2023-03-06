import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <$NavbarContainer>
      <nav>
        <div id='logo'>
          <$Logo to='/'><img id='logo-img' src='/images/blogging.png'/></$Logo>
        </div>
        <div id='links'>
          <$Link to='/my-posts'>My Posts</$Link>
          <$Link to='/sign-up'>Sign Up</$Link>
          <$Link to='/login'>Login</$Link>
        </div>
      </nav>
    </$NavbarContainer>
  );
};
const $NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  align-items: center;
`;

const $Logo = styled(Link)`
  border-bottom: none;
`;

const $Link = styled(Link)`
  text-decoration: none;
  border-right: 2px solid darkgrey;
  border-left: 2px solid darkgrey;
  border-radius: 5px;

  color: black;
  font-size: 25px;
`;

export default Navbar;
