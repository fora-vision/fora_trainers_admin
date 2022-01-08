import React, { useImperativeHandle, useRef } from "react";
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

    margin-bottom: 18px;
  }

  select {
    cursor: pointer;
    padding: 0 20px;
    padding-top: 14px;
    text-transform: capitalize;

    background: transparent;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    appearance: none;
    border: none;
    outline: none;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: #020209;
    margin: 0;
  }

  button {
    pointer-events: none;
    position: absolute;
    top: 18px;
    right: 12px;
  }
`;

const Select = ({ style, className, placeholder, items, ...props }) => {
  const ref = useRef();
  const click = (e) => {
    console.log(ref.current);
    ref.current?.click();
  };

  return (
    <SelectWrap className={className} style={style} onClick={click}>
      <span>{placeholder}</span>
      <select {...props} ref={ref}>
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <PureButton>
        <IconArrow />
      </PureButton>
    </SelectWrap>
  );
};

export default Select;
