import React from "react";
import styled from "styled-components";

export default function FullButton({ title, action, border }) {
  return (
    <Wrapper
      className="animate pointer radius6 font15 semiBold"
      onClick={action ? () => action() : null}
      border={border}
    >
      {title}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  border: 1px solid #333;
  background-color: #fff;
  width: 100%;
  padding: 15px;
  outline: none;
  color: #333;
  :hover {
    background-color: #000000;
    color: #fff;
    letter-spacing: 0.5px;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    transition: background 0.3s ease;
    border: 1px solid #fff;
  }
`;

