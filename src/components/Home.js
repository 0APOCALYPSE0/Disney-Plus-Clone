import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ImgSlider from './ImgSlider';
import Viewers from './Viewers';
import Movies from './Movies';
import db from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies } from '../features/movie/movieSlice';
import { selectUser } from '../features/user/userSlice';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectUser).name;

  useEffect(() => {
    if(!name){
      navigate("/login");
    }
    async function getMovies(){
      const querySnapshot = await getDocs(collection(db, "movies"));
      const tempMovies = [];
      querySnapshot.forEach((doc) => {
        tempMovies.push({id: doc.id, ...doc.data()});
      });
      dispatch(setMovies(tempMovies));
    }
    getMovies();
  }, []);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Movies />
    </Container>
  )
}

export default Home;

const Container = styled.main`
  overflow: hidden;
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  &:before{
    background: url("/images/home-background.png") center center / cover no-repeat fixed;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`