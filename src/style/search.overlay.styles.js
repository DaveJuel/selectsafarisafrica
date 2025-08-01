import styled from "styled-components";

export const OverlayWrapper = styled.div`
  position: fixed;
  top: ${({ show }) => (show ? "0" : "-100%")};
  left: 0;
  width: 100%;
  height: 100vh;
  background: #fff;
  z-index: 999;
  overflow-y: auto;
  transition: top 0.4s ease-in-out;
`;

export const OverlayContent = styled.div`
  padding: 32px 48px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Brand = styled.h1`
  font-weight: 500;
  font-size: 24px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin-top: 32px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 999px;
`;

export const Trending = styled.div`
  display: flex;
  gap: 16px;
  margin: 20px 0;
  font-size: 14px;
  color: #555;
`;

export const Trend = styled.span`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 16px;
  margin: 40px 0 20px;
  font-weight: 400;
  color: #333;
`;

export const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 32px;
`;

export const SectionCard = styled.div`
  text-align: center;
`;

export const SectionImage = styled.img`
  width: 100%;
  object-fit: contain;
  border-radius: 8px;
  background: #f7f7f7;
`;

export const SectionLabel = styled.div`
  margin-top: 12px;
  font-size: 14px;
  color: #888;
`;

export const SectionName = styled.div`
  font-weight: 600;
  font-size: 15px;
  color: #111;
`;
