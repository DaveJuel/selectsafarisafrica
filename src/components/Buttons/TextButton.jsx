import React from "react";
import styled from "styled-components";

export default function TextButton({
  title,
  action,
  icon,
  border,
  isScrolled = false,
  iconPosition = "left",
}) {
  return (
    <Wrapper
      className="animate pointer radius6 font15 semiBold"
      onClick={action ? () => action() : null}
      border={border}
      iconPosition={iconPosition}
      style={{ color: isScrolled? "#333" : "white" }}
      isScrolled={isScrolled}
    >
      {iconPosition === "left" && icon && <IconWrapper>{icon}</IconWrapper>}
      <span>{title}</span>
      {iconPosition === "right" && icon && <IconWrapper>{icon}</IconWrapper>}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  border: ${(props) => (props.border ? "1px solid #333" : "none")};
  background-color: transparent;
  padding: 10px 15px;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-direction: ${(props) =>
    props.iconPosition === "left" ? "row" : "row-reverse"};

  :hover {
    color: #000;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: underline;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;
