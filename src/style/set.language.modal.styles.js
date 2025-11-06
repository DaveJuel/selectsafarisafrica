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
  background: #ffffff10;
  border: 1px solid #4a4a4a40; /* matches RegionLabel color */
  color: #000000ff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background: #ffffff20;
    border-color: #4a4a4a80;
  }
`;
