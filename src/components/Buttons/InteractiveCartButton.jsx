import React, { useState } from "react";
import { FiShoppingBag, FiCheck, FiPlus } from "react-icons/fi";
import styled from "styled-components";
import { useCart } from "../../context/CartProvider";
import { ChooseSizeModal } from "../Elements/ChooseSizeModal";

export const InteractiveCartButton = ({ product, showLabel = false }) => {
  const { cartItems } = useCart();
  const [showAdded, setShowAdded] = useState(false);
  const [showSelectSize, setShowSelectSize] = useState(false);
  
  const isInCart = cartItems.some((item) => item.id === product.id);
  
  const handleAddToCart = () => {
    setShowSelectSize(true);
    setShowAdded(true);
    setTimeout(() => {
      setShowAdded(false);
    }, 1500);
  };
  
  const getCartState = () => {
    if (showAdded) return "added";
    if (isInCart) return "in-cart";
    return "initial";
  };
  
  const getIcon = () => {
    const state = getCartState();
    switch (state) {
      case "added":
        return <FiCheck size={20} />;
      case "in-cart":
        return <FiPlus size={20} />;
      default:
        return <FiShoppingBag size={20} />;
    }
  };
  
  const getClassName = () => {
    const state = getCartState();
    switch (state) {
      case "added":
        return "added";
      case "in-cart":
        return "in-cart";
      default:
        return "";
    }
  };
  
  const getLabel = () => {
    const state = getCartState();
    switch (state) {
      case "added":
        return "ADDED";
      case "in-cart":
        return "IN CART";
      default:
        return "ADD TO CART";
    }
  };
  
  return (
    <>
      <ActionButton
        onClick={handleAddToCart}
        className={getClassName()}
        showLabel={showLabel}
      >
        {getIcon()}
        {showLabel && <span>{getLabel()}</span>}
      </ActionButton>
      {showSelectSize && (
        <ChooseSizeModal
          product={product}
          showSelectSize={showSelectSize}
          setShowSelectSize={setShowSelectSize}
        />
      )}
    </>
  );
};

const ActionButton = styled.button`
  background-color: ${(props) => (props.active ? "black" : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
  border: 1px solid black;
  
  /* Conditional styling based on showLabel */
  ${(props) =>
    props.showLabel
      ? `
        /* Rectangle styling for label mode */
        height: 35px;
        flex-grow: 1;
        border-radius: 0;
        gap: 6px;
        font-size: 0.7rem;
        letter-spacing: 1px;
        padding: 0 12px;
        
        @media (min-width: 768px) {
          height: 45px;
          gap: 8px;
          font-size: 0.8rem;
          padding: 0 16px;
        }
        
        @media (min-width: 1024px) {
          height: 50px;
          gap: 10px;
          font-size: 0.85rem;
          padding: 0 20px;
        }
      `
      : `
        /* Circular styling for icon-only mode */
        width: 28px;
        height: 28px;
        border-radius: 50%;
        padding: 0;
        
        @media (min-width: 768px) {
          width: 32px;
          height: 32px;
        }
        
        @media (min-width: 1024px) {
          width: 36px;
          height: 36px;
        }
        
        /* Smaller icon on mobile */
        svg {
          width: 16px;
          height: 16px;
          
          @media (min-width: 768px) {
            width: 18px;
            height: 18px;
          }
          
          @media (min-width: 1024px) {
            width: 20px;
            height: 20px;
          }
        }
      `}
  
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${(props) => (props.showLabel ? "#333" : "black")};
    color: white;
  }
  
  &.added {
    background-color: black;
    color: white;
  }
  
  /* In cart state styling */
  &.in-cart {
    background-color: black;
    color: white;
  }
  
  /* Mobile-specific adjustments */
  @media (max-width: 767px) {
    &:hover {
      /* Disable hover effects on mobile */
      background-color: ${(props) => (props.active ? "black" : "white")};
      color: ${(props) => (props.active ? "white" : "black")};
    }
  }
`;