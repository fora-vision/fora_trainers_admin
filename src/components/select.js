import React from "react";
import styled from "styled-components";
import { PureButton } from "./button";
import { ReactComponent as IconArrow } from "./icons/arrow-down.svg";

const SelectWrap = styled.div`
  width: 100%;
  height: 60px;
  padding: 0 20px;
  background: #ffffff;
  border-radius: 16px;
  box-sizing: border-box;
  border: 1px solid #e4e4e4;
  color: #000;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  cursor: pointer;

  span {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: #65656d;
  }

  p {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: #020209;
    margin: 0;
  }

  button {
    position: absolute;
    top: 18px;
    right: 12px;
  }
`;

function Select({ style, placeholder, value, onChange, items }) {
  return (
    <SelectWrap style={style}>
      <span>{placeholder}</span>
      <p>{value}</p>

      <PureButton>
        <IconArrow />
      </PureButton>
    </SelectWrap>
  );
}

export default Select;
