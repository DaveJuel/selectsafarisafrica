import styled from "styled-components";

const LoadingSpinner = () => {
  return (
    <LoadingContainer>
      <Globe>
        <GlobeSphere>
          <Meridian rotation="0deg" />
          <Meridian rotation="45deg" />
          <Meridian rotation="90deg" />
          <Meridian rotation="135deg" />
          <Latitude tilt={30} />
          <Latitude tilt={-30} />
        </GlobeSphere>
        <Flag delay="0s" angle={0}>
          <img src="/icons/rwanda-flag.png" alt="Rwanda Flag" />
        </Flag>
        <Flag delay="0.5s" angle={90}>
          <img src="/icons/uganda-flag.png" alt="Uganda Flag" />
        </Flag>
        <Flag delay="1s" angle={180}>
          <img src="/icons/tanzania-flag.png" alt="Tanzania Flag" />
        </Flag>
        <Flag delay="1.5s" angle={270}>
          <img src="/icons/burundi-flag.png" alt="Burundi Flag" />
        </Flag>
      </Globe>
    </LoadingContainer>
  );
};

// Styled Components
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background: rgba(248, 248, 247, 0.82);
  backdrop-filter: blur(15px);
  perspective: 800px; /* stronger perspective */
`;

const Globe = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  animation: globeRotate 6s linear infinite;
  transform-style: preserve-3d;

  @keyframes globeRotate {
    0% {
      transform: rotateY(0deg) rotateX(20deg);
    }
    100% {
      transform: rotateY(360deg) rotateX(20deg);
    }
  }
`;

const GlobeSphere = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-style: preserve-3d;
`;

const Meridian = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border: 1px solid rgba(0, 0, 0, 1);
  border-radius: 50%;
  transform: rotateY(${(props) => props.rotation});
  z-index: 1;
`;

const Latitude = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  transform: rotateX(${(props) => props.tilt}deg);
  z-index: 1;
`;

const Flag = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 22px;
  transform-style: preserve-3d;
  animation: orbit 4s linear infinite;
  animation-delay: ${(props) => props.delay};

  img {
    width: 28px;
    height: 20px;
    object-fit: cover;
    border-radius: 2px;
  }

  @keyframes orbit {
    0% {
      transform: rotateY(${(props) => props.angle}deg) translateZ(70px)
        rotateY(0deg);
    }
    50% {
      transform: rotateY(${(props) => props.angle + 180}deg) translateZ(70px)
        rotateY(180deg);
      opacity: 0.3;
    }
    100% {
      transform: rotateY(${(props) => props.angle + 360}deg) translateZ(70px)
        rotateY(360deg);
    }
  }
`;

export default LoadingSpinner;
