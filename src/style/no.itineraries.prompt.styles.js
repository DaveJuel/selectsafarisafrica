import styled from "styled-components";
// Container for empty state
export const NoItinerariesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 2rem;

  @media (max-width: 768px) {
    min-height: 300px;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    min-height: 250px;
    padding: 1rem;
  }
`;

// Card wrapper
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

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    margin: 0 0.5rem;
  }
`;

// Icon section
export const PromptIcon = styled.div`
  margin-bottom: 1.5rem;

  img {
    width: 80px;
    height: 80px;
    opacity: 0.8;

    @media (max-width: 768px) {
      width: 60px;
      height: 60px;
    }

    @media (max-width: 480px) {
      width: 50px;
      height: 50px;
    }
  }
`;

// Message
export const PromptMessage = styled.p`
  padding: 15px;
  border-radius: 8px;
  color: #666;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.6;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 12px;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 10px;
    margin-bottom: 1rem;
  }
`;

// Actions / buttons
export const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

// Auth prompt section
export const AuthPrompt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 768px) {
    gap: 0.6rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;
