import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import db from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ movie, setMovie ] = useState();
  const name = useSelector(selectUser).name;

  if(!name){
    navigate("/login");
  }

  useEffect(() => {
    async function getMovie(){
      const docRef = doc(db, 'movies', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMovie(docSnap.data());
      } else {
        navigate("/");
      }
    }
    getMovie();
  }, []);
  return (
    <Container>
      {
        movie && (
        <>
          <Background>
            <img src={movie.backgroundImg} alt={movie.title} />
          </Background>
          <ImageTitle>
            <img src={movie.titleImg} alt={movie.title} />
          </ImageTitle>
          <ContentMeta>
            <Controls>
              <PlayButton>
                <img src='/images/play-icon-black.png' alt='' />
                <span>PLAY</span>
              </PlayButton>
              <TrailerButton>
              <img src='/images/play-icon-white.png' alt='' />
              <span>TRAILER</span>
              </TrailerButton>
              <AddButton>
                <span>+</span>
              </AddButton>
              <GroupWatchButton>
                <img src='/images/group-icon.png' alt='' />
              </GroupWatchButton>
            </Controls>
            <SubTitle>
              {movie.subTitle}
            </SubTitle>
            <Description>
              {movie.description}
            </Description>
          </ContentMeta>
        </>
        )
      }
    </Container>
  )
}

export default Detail;

const Container = styled.div`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  top: 70px;
`

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  opacity: 0.8;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    @media (max-width: 768px) {
      width: initial;
    }
  }
`

const ImageTitle = styled.div`
  margin-top: 150px;
  align-items: flex-end;
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  height: 30vh;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;
  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
`

const ContentMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
`

const PlayButton = styled.button`
  margin-right: 22px;
  border-radius: 4px;
  font-size: 15px;
  display: flex;
  align-items: center;
  height: 56px;
  background-color: rgb(249, 249, 249);
  border: none;
  padding: 0px 24px;
  letter-spacing: 1.8px;
  cursor: pointer;
  text-transform: uppercase;
  &:hover {
    background-color: rgb(198, 198, 198);
  }
`

const TrailerButton = styled(PlayButton)`
  background: rgb(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
`

const AddButton = styled.button`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid white;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  margin-right: 16px;
  span {
    font-size: 30px;
    color: white;
  }
`

const GroupWatchButton = styled(AddButton)`
  background: rgb(0, 0, 0);
`

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;
  margin-top: 26px;
`

const Description = styled.div`
  color: rgb(249, 249, 249);
  line-height: 1.4;
  font-size: 20px;
  margin-top: 16px;
  max-width: 760px;
`