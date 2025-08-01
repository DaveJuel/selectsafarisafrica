import React from 'react';
import styled, { keyframes } from 'styled-components';

export default function JourneyRunner ({ 
  width = '100%', 
  height = '200px', 
  speed = 'normal',
  theme = 'light' 
}) {
  return (
    <GameContainer width={width} height={height} theme={theme}>
      {/* Sky and Background */}
      <Sky theme={theme}>
        <CloudsLayer>
          <Cloud delay="0s" />
          <Cloud delay="3s" />
          <Cloud delay="6s" />
        </CloudsLayer>
      </Sky>
      
      {/* Ground Layer */}
      <Ground theme={theme}>
        <GroundPattern />
      </Ground>
      
      {/* Airplane Section */}
      <AirplaneSection>
        <Airplane speed={speed}>✈️</Airplane>
        <Runway />
      </AirplaneSection>
      
      {/* Car Section */}
      <CarSection>
        <Car speed={speed}>🚗</Car>
        <Road />
        {/* Scenery Elements */}
        <SceneryContainer>
          <Tree delay="0s">🌳</Tree>
          <Tree delay="2s">🌲</Tree>
          <Tree delay="4s">🌴</Tree>
          <Bush delay="1s">🌿</Bush>
          <Bush delay="3s">🌿</Bush>
          <Rock delay="5s">🪨</Rock>
        </SceneryContainer>
      </CarSection>
      
      {/* City Buildings (when airplane flies over) */}
      <CitySection>
        <BuildingsContainer>
          <Building height="60px" delay="0s">🏢</Building>
          <Building height="80px" delay="1s">🏬</Building>
          <Building height="45px" delay="2s">🏪</Building>
          <Building height="70px" delay="3s">🏢</Building>
          <Building height="55px" delay="4s">🏬</Building>
        </BuildingsContainer>
      </CitySection>
    </GameContainer>
  );
};

// Animation Keyframes
const moveLeft = keyframes`
  from {
    transform: translateX(100vw);
  }
  to {
    transform: translateX(-100px);
  }
`;

const airplaneJourney = keyframes`
  0% {
    transform: translateX(-100px) translateY(0px) rotate(15deg);
    opacity: 1;
  }
  10% {
    transform: translateX(100px) translateY(-20px) rotate(5deg);
    opacity: 1;
  }
  25% {
    transform: translateX(300px) translateY(-40px) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: translateX(calc(100vw - 100px)) translateY(-30px) rotate(-5deg);
    opacity: 1;
  }
  60% {
    transform: translateX(calc(100vw + 50px)) translateY(-10px) rotate(-10deg);
    opacity: 0;
  }
  100% {
    transform: translateX(calc(100vw + 100px)) translateY(0px) rotate(-15deg);
    opacity: 0;
  }
`;

const carJourney = keyframes`
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
  60% {
    transform: translateX(-100px);
    opacity: 0;
  }
  65% {
    transform: translateX(-50px);
    opacity: 1;
  }
  90% {
    transform: translateX(calc(100vw - 50px));
    opacity: 1;
  }
  95% {
    transform: translateX(calc(100vw + 50px));
    opacity: 0;
  }
  100% {
    transform: translateX(calc(100vw + 100px));
    opacity: 0;
  }
`;

const cloudFloat = keyframes`
  from {
    transform: translateX(100vw);
  }
  to {
    transform: translateX(-200px);
  }
`;

const groundScroll = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100px);
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
`;

// Styled Components
const GameContainer = styled.div`
  position: relative;
  width: ${props => props.width};
  height: ${props => props.height};
  overflow: hidden;
  background: ${props => props.theme === 'dark' 
    ? 'linear-gradient(to bottom, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
    : 'linear-gradient(to bottom, #87CEEB 0%, #98d8f4 50%, #b8e6b8 100%)'
  };
  border: 2px solid ${props => props.theme === 'dark' ? '#333' : '#ccc'};
  border-radius: 8px;
  font-family: 'Courier New', monospace;
`;

const Sky = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: ${props => props.theme === 'dark' 
    ? 'linear-gradient(to bottom, #1a1a2e, #16213e)'
    : 'linear-gradient(to bottom, #87CEEB, #98d8f4)'
  };
`;

const CloudsLayer = styled.div`
  position: absolute;
  top: 10px;
  width: 100%;
  height: 40px;
`;

const Cloud = styled.div`
  position: absolute;
  top: ${Math.random() * 30}px;
  font-size: 20px;
  animation: ${cloudFloat} 15s linear infinite;
  animation-delay: ${props => props.delay};
  opacity: 0.7;
  
  &:before {
    content: '☁️';
  }
`;

const Ground = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: ${props => props.theme === 'dark' ? '#2d2d2d' : '#90EE90'};
  border-top: 2px solid ${props => props.theme === 'dark' ? '#555' : '#228B22'};
`;

const GroundPattern = styled.div`
  position: absolute;
  bottom: 0;
  width: 200%;
  height: 4px;
  background: repeating-linear-gradient(
    to right,
    transparent 0px,
    transparent 10px,
    #666 10px,
    #666 12px
  );
  animation: ${groundScroll} 2s linear infinite;
`;

const AirplaneSection = styled.div`
  position: absolute;
  bottom: 60px;
  width: 100%;
  height: 60px;
`;

const Airplane = styled.div`
  position: absolute;
  bottom: 20px;
  font-size: 24px;
  animation: ${airplaneJourney} ${props => 
    props.speed === 'fast' ? '8s' : 
    props.speed === 'slow' ? '16s' : '12s'
  } ease-in-out infinite;
  z-index: 10;
`;

const Runway = styled.div`
  position: absolute;
  bottom: 15px;
  left: 0;
  width: 200px;
  height: 4px;
  background: repeating-linear-gradient(
    to right,
    #666 0px,
    #666 20px,
    transparent 20px,
    transparent 30px
  );
`;

const CarSection = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  height: 40px;
`;

const Car = styled.div`
  position: absolute;
  bottom: 15px;
  font-size: 20px;
  animation: ${carJourney} ${props => 
    props.speed === 'fast' ? '8s' : 
    props.speed === 'slow' ? '16s' : '12s'
  } linear infinite, ${bounce} 1s ease-in-out infinite;
  z-index: 10;
`;

const Road = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  height: 6px;
  background: #444;
  border-top: 1px dashed #fff;
  border-bottom: 1px solid #222;
`;

const SceneryContainer = styled.div`
  position: absolute;
  bottom: 25px;
  width: 100%;
  height: 40px;
`;

const Tree = styled.div`
  position: absolute;
  bottom: 0;
  font-size: 16px;
  animation: ${moveLeft} 10s linear infinite;
  animation-delay: ${props => props.delay};
`;

const Bush = styled.div`
  position: absolute;
  bottom: 5px;
  font-size: 12px;
  animation: ${moveLeft} 8s linear infinite;
  animation-delay: ${props => props.delay};
`;

const Rock = styled.div`
  position: absolute;
  bottom: 8px;
  font-size: 10px;
  animation: ${moveLeft} 12s linear infinite;
  animation-delay: ${props => props.delay};
`;

const CitySection = styled.div`
  position: absolute;
  bottom: 40px;
  width: 100%;
  height: 100px;
`;

const BuildingsContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

const Building = styled.div`
  position: absolute;
  bottom: 0;
  width: 40px;
  height: ${props => props.height};
  font-size: 20px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  animation: ${moveLeft} 15s linear infinite;
  animation-delay: ${props => props.delay};
  opacity: 0.8;
`;