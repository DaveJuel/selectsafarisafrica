import styled from "styled-components";

// Styled Components
export const NoItinerariesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 2rem;
`;

export const PromptCard = styled.div`
  padding: 25px;
  background: #f9f9f9;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #eee;
  max-width: 500px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    margin: 0 1rem;
  }
`;

export const PromptIcon = styled.div`
  margin-bottom: 1.5rem;

  img {
    width: 80px;
    height: 80px;
    opacity: 0.8;
  }
`;

export const PromptMessage = styled.p`
  padding: 15px;
  border-radius: 8px;
  color: #666;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

export const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const AuthPrompt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;