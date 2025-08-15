import React, { useState, useEffect } from "react";
import { adventuresVideos } from "../../data/adventures.videos";
import LoadingSpinner from "../Elements/LoadingSpinner";
import { useTranslation } from "react-i18next";
import {
  CaptionOverlay,
  CaptionText,
  Header,
  HeaderContent,
  HeaderSubtitle,
  HeaderTitle,
  StyledVideo,
  VideoColumn,
  VideoContainer,
  VideoGrid,
  ViewWrapper,
} from "../../style/adventures.view.styles";
import VideoDetailOverlay from "../Elements/VideoDetailOverlay";
import SSAIntelligenceOverlay from "../Elements/SSAIntelligenceOverlay";

export default function AdventuresView({ formData }) {
  const [currentLayout, setCurrentLayout] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [videos, setVideos] = useState([]);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [hoveredVideoIndex, setHoveredVideoIndex] = useState(null);
  const [overlayLocked, setOverlayLocked] = useState(false);
  const [videoPosition, setVideoPosition] = useState(null);
  const [activeOverlay, setActiveOverlay] = useState(null);

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
      if (overlayLocked && hoveredVideoIndex !== null) {
        return;
      }
      setCurrentLayout((prev) => (prev + 1) % 2);
    }, 8000);

    return () => clearInterval(interval);
  }, [overlayLocked, hoveredVideoIndex]);

  const getVideoOrder = (layoutIndex) => {
    const orders = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
    ];
    return orders[layoutIndex];
  };

  const videoOrder = getVideoOrder(currentLayout);

  const getVideoPosition = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      right: rect.right + window.scrollX,
      bottom: rect.bottom + window.scrollY,
      width: rect.width,
      height: rect.height,
    };
  };

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
              <>
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
                    <CaptionOverlay
                      onMouseEnter={(event) => {
                        if (!overlayLocked) {
                          setHoveredVideo(videos[videoIndex]);
                          setHoveredVideoIndex(videoIndex);
                          setVideoPosition(getVideoPosition(event));
                          setOverlayLocked(true);
                          setActiveOverlay("videoDetail");
                        }
                      }}
                    >
                      <CaptionText>
                        {t(videos[videoIndex]?.caption)}
                      </CaptionText>
                    </CaptionOverlay>
                  </VideoContainer>
                </VideoColumn>
                <VideoDetailOverlay
                  video={hoveredVideo}
                  isVisible={activeOverlay === "videoDetail"}
                  videoIndex={hoveredVideoIndex}
                  videoPosition={videoPosition}
                  onClose={() => {
                    setHoveredVideo(null);
                    setHoveredVideoIndex(null);
                    setVideoPosition(null);
                    setOverlayLocked(false);
                    setActiveOverlay(null);
                  }}
                  onTalkToExpert={() => setActiveOverlay("expert")}
                />
                <SSAIntelligenceOverlay
                  video={hoveredVideo}
                  isVisible={activeOverlay === "expert"}
                  videoIndex={hoveredVideoIndex}
                  onClose={() => setActiveOverlay("videoDetail")}
                  videoPosition={videoPosition}
                />
              </>
            ))}
        </VideoGrid>
      )}
    </ViewWrapper>
  );
}
