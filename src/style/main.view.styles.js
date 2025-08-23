import styled from "styled-components";
// Styled Components for MainView

export const MainWrapper = styled.div`
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  background-image: url("/bg_image2.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
   background-attachment: fixed;
  padding: 20px;
`;

export const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 10px;
  height: calc(80vh - 20px);
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
    height: auto;
  }
`;

export const ViewSection = styled.div`
  backdrop-filter: blur(5px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  height: 100%; /* Take full height of grid cell */
  overflow-y: auto; /* Enable vertical scrolling */
  overflow-x: hidden; /* Hide horizontal overflow */

  /* Custom scrollbar styling (optional) */
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
    height: auto; /* Natural height on mobile */
    overflow-y: visible; /* Disable scroll on mobile */
  }
`;
