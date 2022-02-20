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
          {/* <UserImg src={photo} onClick={logOut} /> */}
          <SignOut>
            <UserImg src={photo} alt={name} />
            <DropDown>
              <span onClick={logOut}>Sign out</span>
            </DropDown>
          </SignOut>
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

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;