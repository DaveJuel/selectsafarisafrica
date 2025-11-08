import styled from "styled-components";

export const RegionsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  /* Large screens → 4 columns */
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
`;

export const LanguagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const RegionLabel = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
  color: #4a4a4a; /* main label color */
  letter-spacing: 0.6px;
`;

export const LanguagesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LanguageButton = styled.button`
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  transition: all 0.2s ease;
  width: 100%;

  background: ${({ active }) => active ? "#0E5D3B" : "#f4f4f4"};
  color: ${({ active }) => active ? "white" : "black"};
  border-color: ${({ active }) => active ? "#0E5D3B" : "transparent"};

  &:hover {
    background: #ffffff20;
    border-color: #4a4a4a80;
  }
`;
