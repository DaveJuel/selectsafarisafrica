import { CircleLoader } from "react-spinners";
import styled from "styled-components";

const LoadingSpinner = () => {
  return (
    <LoadingContainer>
        <CircleLoader size={70} color="#664C35" />
    </LoadingContainer>
  );
};

// Styled Components
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background: rgba(248, 248, 247, 0.71);
  backdrop-filter: blur(15px);
  perspective: 800px; /* stronger perspective */
`;

export default LoadingSpinner;
