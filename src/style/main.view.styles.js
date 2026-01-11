import styled from "styled-components";
// Styled Components for MainView

export const MainWrapper = styled.div`
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  background-image: url("https://res.cloudinary.com/addax/image/upload/v1758377448/uploads/bg_image2_ynph9g.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const ContentContainer = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 10px;
  height: calc(95vh);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 5px;
    height: auto;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 5px;
    padding: 0 8px;
    height: auto;
  }
`;


export const ViewSection = styled.div`
  backdrop-filter: blur(5px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 1024px) {
    height: auto;
    overflow-y: visible;
  }
`;


export const FloatingChatButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 26px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  transition: all 0.2s ease;

  z-index: 9999;

  &:hover {
    transform: scale(1.05);
    background: rgba(0, 0, 0, 0.75);
  }

  @media (max-width: 480px) {
    bottom: 16px;
    right: 16px;
  }
`;