import styled from "styled-components";

export const Sidebar = styled.div`
  width: 30%;
  background: #F5F5F5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Body = styled.div`
  width: 70%;
  background: #F5F5F5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const HeaderInfo = styled.div`
  margin-bottom: 20px;
`;

export const SearchBox = styled.div`
  margin-top: 10px;
  input {
    width: 93%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

export const Section = styled.div`
  margin-top: 30px;

  h3 {
    margin-bottom: 10px;
  }

  p {
    line-height: 1.6;
  }
`;

export const ViewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

export const ViewCard = styled.div`
  background: ${(props) => (props.isSelected ? "#d4edda" : "#f7f7f7")};
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #e9f5ec;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }

  h4 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    color: #666;
  }

  span {
    font-size: 12px;
    color: #999;
  }
`;

export const Button = styled.button`
  background-color: #656565;
  color: #FF9A0A;
  border: none;
  padding: 12px 24px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;

  &:hover {
    background-color: #FF9A0A;
    color: #F5F5F5;
  }
`;

export const ButtonRed = styled.button`
  background-color: #c52a2a;
  color: white;
  border: none;
  padding: 12px 24px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

export const PaginationWrapper = styled.div`
  margin-top: 20px;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  width: 800px;
  border-radius: 5px;
`;

export const SelectBox = styled.select`
  width: 97%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border 0.3s;
  &:focus {
    border-color: #4caf50;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  border: none;
  cursor: pointer;
  color: #333;
`;

export const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

export const Skill = styled.span`
  background-color: #f1f1f1;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 14px;
  color: #4caf50;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e0e0e0;
    cursor: pointer;
  }
`;

export const FileInput = styled.div`
  display: flex;
  flex-direction: column;
  input {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
    margin-bottom: 8px;
    outline: none;
    cursor: pointer;
    transition: border 0.3s;
    &:focus {
      border-color: #4caf50;
    }
  }
  span {
    font-size: 14px;
    color: #888;
  }
`;

export const PromptContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: lefct;
  background: #f9fafc;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  margin: 0 auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const PromptMessage = styled.div`
  margin-bottom: 20px;

  h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: #666;
    line-height: 1.5;
  }
`;

export const StyledButton = styled(Button)`
  && {
    font-size: 16px;
    padding: 10px 20px;
    border-radius: 5px;
    text-transform: none;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 20px 0;
  background-image: url("${process.env.PUBLIC_URL}/tailorbg5.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  backdrop-filter: blur(5px);
  background: rgba(30, 30, 30, 0.5);
  z-index: 1;
`;

export const Container = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding-top: 80px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

export const PageWrapper = styled.div`
  min-height: 540px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 420px;
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 30px 25px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 25px;
`;

export const Input = styled.input`
  padding: 12px 16px;
  font-size: 15px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  &:focus {
    outline: none;
    border-color: #888;
    background-color: #fff;
  }
`;

export const Message = styled.p`
  margin-top: 15px;
  font-size: 13px;
  color: #333;
`;

export const StatusMessage = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: ${(props) => (props.type === "success" ? "#28a745" : "#dc3545")};
  text-align: center;
  font-weight: bold;
`;


export const InputWrapper = styled.div`
  position: relative;
  @media (max-width: 960px) {
    width: 93.4%;
    justify-content: center;
  }
  
`;

export const InputGroup = styled.div`
  position: relative;
  margin-bottom: 24px;
  width: 100%;
  max-width: 100%;
`;

export const StyledInput = styled.input`
  width: 100%;
  max-width: 100%;
  padding: 16px 20px 16px 50px;
  border: 1px solid #e1e1e1;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box; /* This ensures padding is included in width calculation */
  
  /* Responsive adjustments for smaller screens */
  @media (max-width: 768px) {
    padding: 14px 16px 14px 45px;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    padding: 12px 14px 12px 40px;
    font-size: 0.85rem;
  }
  
  &:focus {
    outline: none;
    border-color: #000;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
  pointer-events: none;
  
  /* Responsive icon positioning */
  @media (max-width: 768px) {
    left: 14px;
  }
  
  @media (max-width: 480px) {
    left: 12px;
  }
`;

export const StyledTextArea = styled.textarea`
  width: 97%;
  height: 150px;
  padding: 15px;
  border: 1px solid #4A4A4A;
  font-size: 1rem;
  resize: vertical;
  box-sizing: border-box;
  color: #4A4A4A;

  &:focus {
    outline: none;
    border-color: #030303;
  }

  &::placeholder {
    color: #aaa;
  }
`;


export const ToggleIcon = styled.div`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #6e7a83;
  
  &:hover {
    color: #49cb86;
  }
`;

export const GoogleButton = styled.button`
  width: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: rgba(228, 188, 135, 0.2);
  color: #666;
  border: 2px solid rgba(228, 188, 135, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(228, 188, 135, 0.2);
    border-color: rgba(228, 188, 135, 0.5);
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    border-color: #49cb86;
  }
`;

export const ContactSupportButton = styled(GoogleButton)`
  background: rgba(100, 200, 255, 0.2);
  border-color: rgba(100, 200, 255, 0.3);

  &:hover {
    border-color: rgba(100, 200, 255, 0.5);
  }

  &:focus {
    border-color: #00aaff;
  }
`;
