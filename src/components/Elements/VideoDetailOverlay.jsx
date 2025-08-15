import { useTranslation } from "react-i18next";
import HtmlContainerView from "./HtmlContainerView";
import {
  CloseButton,
  DetailItem,
  DetailLabel,
  ExpertButton,
  HeaderTitle,
  LocationItem,
  LocationLabel,
  LocationValue,
  OverlayBody,
  OverlayFooter,
  OverlayHeader,
  ScrollableDetailValue,
  SidePanelContent,
  SidePanelOverlay,
} from "../../style/video.detail.overlay.styles";

const VideoDetailOverlay = ({
  video,
  isVisible,
  videoIndex,
  onClose,
  videoPosition,
  onTalkToExpert
}) => {
  const { t } = useTranslation("adventures");
  if (!isVisible || !videoPosition) return null;

  const isLeftSide = videoIndex >= 2;

  return (
    <>
      <SidePanelOverlay isLeftSide={isLeftSide}>
        <SidePanelContent>
          <OverlayHeader>
            <HeaderTitle>{t(video?.caption)}</HeaderTitle>
            <CloseButton onClick={onClose}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </CloseButton>
          </OverlayHeader>

          <OverlayBody>
            <LocationItem>
              <LocationLabel>Country:</LocationLabel>
              <LocationValue>{video?.country || "-"}</LocationValue>
            </LocationItem>
            <LocationItem>
              <LocationLabel>City:</LocationLabel>
              <LocationValue>{video?.city || "-"}</LocationValue>
            </LocationItem>
            <DetailItem>
              <DetailLabel>Description:</DetailLabel>
              <ScrollableDetailValue>
                <HtmlContainerView content={video?.description} />
              </ScrollableDetailValue>
            </DetailItem>
          </OverlayBody>

          <OverlayFooter>
            <ExpertButton onClick={onTalkToExpert}>
              Talk to an Expert
            </ExpertButton>
          </OverlayFooter>
        </SidePanelContent>
      </SidePanelOverlay>
    </>
  );
};

export default VideoDetailOverlay;
