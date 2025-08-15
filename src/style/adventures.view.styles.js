
import styled, { keyframes, css } from "styled-components";

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const slideIn = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

export const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Layout & Styling
export const ViewWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Header = styled.header`
  position: relative;
  text-align: center;
  padding: 60px 20px 40px;
  background: linear-gradient(
    135deg,
    rgba(16, 169, 105, 0.05),
    rgba(14, 80, 51, 0.08)
  );
  backdrop-filter: blur(10px);
  border-bottom: 2px solid rgba(16, 169, 105, 0.2);
`;

export const HeaderContent = styled.div`
  ${({ animate }) =>
    animate &&
    css`
      animation: ${fadeIn} 1s ease-out;
    `}
`;

export const HeaderTitle = styled.h1`
  color: #0e5033;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  background: linear-gradient(45deg, #0e5033, #0e5033, #0e5033);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #e4bc87;
  animation: ${shimmer} 3s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const HeaderSubtitle = styled.p`
  color: #e4bc87;
  opacity: 0.8;
  font-size: 20px;
  font-weight: 300;
  max-width: 600px;
  margin: 0 auto;
  text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.05);
  line-height: 1.4;
`;

export const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 7px;
  padding: 40px 20px;
  height: calc(120vh - 370px);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    height: calc(100vh - 250px);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    height: calc(100vh - 200px);
  }
`;

export const VideoColumn = styled.div`
  position: relative;
  transition: transform 0.3s ease;

  ${({ animate, position }) =>
    animate &&
    css`
      animation: ${slideIn} 0.14s ease-out;
      animation-delay: ${position * 0.2}s;
      animation-fill-mode: both;
    `}

  &:hover {
    transform: translateY(-10px);
  }
`;

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 7px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  background: #000;
`;

export const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${VideoContainer}:hover & {
    transform: scale(1.1);
  }
`;

export const CaptionOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 2rem 1rem 1rem;
`;

export const CaptionText = styled.p`
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  line-height: 1.4;
`;
