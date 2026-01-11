import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 8px;
`;

const Step = styled.div`
  flex: 1;
  text-align: center;
  padding: 10px 0;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;

  background: #ffffff;
  color: #0E5033;

  border: 2px solid ${({ active }) =>
    active ? "#0E5033" : "rgba(14, 80, 51, 0.25)"};

  box-shadow: ${({ active }) =>
    active ? "0 4px 12px rgba(14, 80, 51, 0.25)" : "none"};

  transition: all 0.25s ease;
`;

export default function StepIndicator({ current }) {
  return (
    <Wrapper>
      <Step active={current === 1}>1. Personal Info</Step>
      <Step active={current === 2}>2. Accommodation</Step>
      <Step active={current === 3}>3. Transport</Step>
    </Wrapper>
  );
}
