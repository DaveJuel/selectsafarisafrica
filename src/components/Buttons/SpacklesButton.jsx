import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiShoppingBag } from 'react-icons/fi';

// Sparkle animation keyframes
const sparkleAnimation = keyframes`
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(0);
  }
  50% {
    opacity: 1;
    transform: translate(var(--dx), var(--dy)) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(calc(var(--dx) * 1.5), calc(var(--dy) * 1.5)) scale(0);
  }
`;

// Sparkle container
const SparkleContainer = styled.div`
  position: relative;
  display: inline-block;
`;

// Individual sparkle
const Sparkle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  background-color: ${props => props.color};
  border-radius: 50%;
  pointer-events: none;
  animation: ${sparkleAnimation} 0.8s ease-out forwards;
  --dx: ${props => props.dx}px;
  --dy: ${props => props.dy}px;
  
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    width: 6px;
    height: 6px;
    background-color: ${props => props.color === 'black' ? 'white' : 'black'};
    border-radius: 50%;
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 8px;
    background-color: ${props => props.color};
    transform: translate(-50%, -50%);
    border-radius: 1px;
  }
`;

const ActionButton = styled.button`
  background-color: ${(props) => (props.active ? "black" : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
  border: 2px solid ${(props) => (props.active ? "white" : "black")};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
  
  &:hover {
    background-color: black;
    color: white;
    border-color: white;
  }
`;

const SpacklesButton = ({ product, handleAddToCart, ...props }) => {
  const [sparkles, setSparkles] = useState([]);

  const createSparkles = () => {
    const newSparkles = [];
    const sparkleCount = 8;
    
    for (let i = 0; i < sparkleCount; i++) {
      const angle = (i * 360) / sparkleCount;
      const distance = 30 + Math.random() * 20;
      const dx = Math.cos((angle * Math.PI) / 180) * distance;
      const dy = Math.sin((angle * Math.PI) / 180) * distance;
      
      newSparkles.push({
        id: Date.now() + i,
        dx,
        dy,
        color: Math.random() > 0.5 ? 'black' : 'white'
      });
    }
    
    setSparkles(newSparkles);
    
    // Clear sparkles after animation completes
    setTimeout(() => {
      setSparkles([]);
    }, 800);
  };

  const handleClick = () => {
    createSparkles();
    handleAddToCart(product);
  };

  return (
    <SparkleContainer>
      <ActionButton onClick={handleClick} {...props}>
        <FiShoppingBag size={20} />
      </ActionButton>
      {sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          dx={sparkle.dx}
          dy={sparkle.dy}
          color={sparkle.color}
        />
      ))}
    </SparkleContainer>
  );
};

export default SpacklesButton;