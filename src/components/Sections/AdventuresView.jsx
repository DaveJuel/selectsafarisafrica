import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { adventuresVideos } from "../../data/adventures.videos";
import LoadingSpinner from "../Elements/LoadingSpinner";
import { useTranslation } from "react-i18next";

export default function AdventuresView({ formData }) {
  const [currentLayout, setCurrentLayout] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [videos, setVideos] = useState([]);
  const { t } = useTranslation("adventures");

  useEffect(() => {
    const fetchVideos = () => {
      const videosList = adventuresVideos.flatMap((country) => country.videos);
      setVideos(videosList);
    };
    fetchVideos();
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (formData.country) {
      setHasLoaded(false);
      const videosList = adventuresVideos
        .filter(
          (item) =>
            item.country.toLowerCase() === formData.country.toLowerCase()
        )
        ?.flatMap((item) => item?.videos);
      setVideos(videosList);
      setHasLoaded(true);
    }
  }, [formData.country]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLayout((prev) => (prev + 1) % 2);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getVideoOrder = (layoutIndex) => {
    const orders = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
    ];
    return orders[layoutIndex];
  };

  const videoOrder = getVideoOrder(currentLayout);

  return (
    <ViewWrapper>
      <Header>
        <HeaderContent animate={hasLoaded}>
          <HeaderTitle>{t("elevate_experience")}</HeaderTitle>
          <HeaderSubtitle>{t("elevate_experience_message")}</HeaderSubtitle>
        </HeaderContent>
      </Header>
      {!hasLoaded && <LoadingSpinner />}
      {hasLoaded && (
        <VideoGrid>
          {videoOrder?.length > 1 &&
            videoOrder?.map((videoIndex, position) => (
              <VideoColumn
                key={`${videoIndex}-${position}`}
                position={position}
                animate={hasLoaded}
              >
                <VideoContainer>
                  <StyledVideo
                    autoPlay
                    muted
                    loop
                    playsInline
                    src={videos[videoIndex]?.video}
                  />
                  <CaptionOverlay>
                    <CaptionText>{t(videos[videoIndex]?.caption)}</CaptionText>
                  </CaptionOverlay>
                </VideoContainer>
              </VideoColumn>
            ))}
        </VideoGrid>
      )}
    </ViewWrapper>
  );
}

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Layout & Styling
const ViewWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.header`
  position: relative;
  text-align: center;
  padding: 60px 20px 40px;
  background: linear-gradient(
    135deg,
    rgba(16, 169, 105, 0.05),
    rgba(14, 80, 51, 0.08)
  );
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(16, 169, 105, 0.2);
`;

const HeaderContent = styled.div`
  ${({ animate }) =>
    animate &&
    css`
      animation: ${fadeIn} 1s ease-out;
    `}
`;

const HeaderTitle = styled.h1`
  color: #0e5033;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  background: linear-gradient(45deg, #0e5033, #0e5033, #0e5033);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shimmer} 3s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const HeaderSubtitle = styled.p`
  color: #0e5033;
  opacity: 0.8;
  font-size: 20px;
  font-weight: 300;
  max-width: 600px;
  margin: 0 auto;
  text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.05);
  line-height: 1.4;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 7px;
  padding: 40px 20px;
  height: calc(110vh - 350px);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    height: calc(100vh - 250px);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    height: calc(100vh - 200px);
  }
`;

const VideoColumn = styled.div`
  position: relative;
  transition: transform 0.3s ease;

  ${({ animate, position }) =>
    animate &&
    css`
      animation: ${slideIn} 0.8s ease-out;
      animation-delay: ${position * 0.2}s;
      animation-fill-mode: both;
    `}

  &:hover {
    transform: translateY(-10px);
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 7px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  background: #000;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${VideoContainer}:hover & {
    transform: scale(1.1);
  }
`;

const CaptionOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 2rem 1rem 1rem;
`;

const CaptionText = styled.p`
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  line-height: 1.4;
`;
