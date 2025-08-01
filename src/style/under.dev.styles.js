import styled, { keyframes } from "styled-components";

// Soft glow using grayscale tones
const glow = keyframes`
  0%, 100% {
    text-shadow: 0 0 10px #fff, 0 0 20px #999, 0 0 30px #aaa;
  }
  50% {
    text-shadow: 0 0 20px #eee, 0 0 30px #bbb, 0 0 40px #ccc;
  }
`;

export const HeroWrapper = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const BackgroundImage = styled.div`
  position: absolute;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  filter: brightness(0.5) grayscale(0.2);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const ImageOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    rgba(0, 0, 0, 0.3),
    rgba(60, 60, 60, 0.3)
  );
  backdrop-filter: blur(2px);
  z-index: 2;
  top: 0;
  left: 0;
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 3;
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
  animation: ${glow} 3s ease-in-out infinite;
  color: #f5f5f5;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

export const HeroSubTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  margin-top: 20px;
  max-width: 650px;
  color: #dddddd;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const UnderDevNote = styled.div`
  margin-top: 40px;
  font-size: 1rem;
  color: #cccccc;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-top: 10px;
  }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top: 4px solid #888888;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${rotate} 1s linear infinite;
`;
