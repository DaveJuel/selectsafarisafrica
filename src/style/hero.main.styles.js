import styled from "styled-components";

export const HeroWrapper = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const VideoBackground = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const VideoOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  top: 0;
  left: 0;
  z-index: 2;
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  width: 100%;
  height: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
`;

export const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const HeroSubTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 300;
  margin-top: 20px;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const BtnWrapper = styled.div`
  margin-top: 30px;
`;
