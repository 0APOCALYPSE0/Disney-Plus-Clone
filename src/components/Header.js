import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { selectUser, setUserLogin, setSignOut } from '../features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';

function Header() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { name, email, photo } = useSelector(selectUser);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if(user){
        dispatch(setUserLogin({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL
        }));
        navigate('/');
      }
    })
  }, []);

  const signIn = () => {
    signInWithPopup(auth, provider).then((userData) => {
      dispatch(setUserLogin({
        name: userData.user.displayName,
        email: userData.user.email,
        photo: userData.user.photoURL
      }));
      navigate('/');
    });
  }

  const logOut = () => {
    signOut(auth).then(() => {
      dispatch(setSignOut());
      navigate("/login");
    });
  }

  return (
    <Nav>
      <Logo src="/images/logo.svg" />
      {
        !name ? (
          <LoginContainer>
            <Login onClick={signIn}>Login {name}</Login>
          </LoginContainer>
        ):
        <>
          <NavMenu>
            <a href="#">
              <img src="/images/home-icon.svg" alt='home icon'/>
              <span>HOME</span>
            </a>
            <a href="#">
              <img src="/images/search-icon.svg" alt='search icon'/>
              <span>SEARCH</span>
            </a>
            <a href="#">
              <img src="/images/watchlist-icon.svg" alt='watchlist icon'/>
              <span>WATCHLIST</span>
            </a>
            <a href="#">
              <img src="/images/original-icon.svg" alt='original icon'/>
              <span>ORIGINALS</span>
            </a>
            <a href="#">
              <img src="/images/movie-icon.svg" alt='movie icon'/>
              <span>MOVIES</span>
            </a>
            <a href="#">
              <img src="/images/series-icon.svg" alt='series icon'/>
              <span>SERIES</span>
            </a>
          </NavMenu>
          <UserImg src={photo} onClick={logOut} />
        </>
      }
    </Nav>
  )
}

export default Header;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  z-index: 3;
`

const Logo = styled.img`
  width: 80px;

`

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;
  a{
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    img {
      height: 20px;
    }
    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;
      &:after{
        content: "";
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        transform-origin: left center;
        transform: scaleX(0);
      }
    }
    &:hover{
      span:after{
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
`

const LoginContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const Login = styled.button`
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  padding: 8px 16px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: rgba(0,0,0,0.6);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease 0s;
  &:hover{
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`