import styled from 'styled-components';

export const OverlayBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2rem;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(228, 188, 135, 0.1);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(228, 188, 135, 0.4);
    border-radius: 3px;
    &:hover {
      background: rgba(228, 188, 135, 0.6);
    }
  }
`;

export const EmptyState = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(228, 188, 135, 0.8);
  font-size: 0.95rem;
  font-style: italic;
`;

export const ChatHistory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const MessageBubble = styled.div`
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  background: ${({ isUser }) => (isUser ? '#0D482E' : 'rgba(228, 188, 135, 0.2)')};
  color: ${({ isUser }) => (isUser ? '#fff' : '#0D482E')};
  align-self: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  word-wrap: break-word;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
`;

export const TypingIndicator = styled.div`
  font-size: 0.85rem;
  font-style: italic;
  color: rgba(228, 188, 135, 0.7);
  align-self: flex-start;
`;


export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TextInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid #e4bc87;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #d4a574;
    box-shadow: 0 0 5px rgba(212, 165, 116, 0.4);
  }
`;

export const SendButton = styled.button`
  background: linear-gradient(135deg, #e4bc87 0%, #d4a574 100%);
  color: #0D482E;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 20px rgba(228, 188, 135, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(228, 188, 135, 0.4);
    background: linear-gradient(135deg, #d4a574 0%, #e4bc87 100%);
  }
  
  &:active {
    transform: translateY(0);
  }
`;
