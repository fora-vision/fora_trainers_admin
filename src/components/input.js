import styled, { css } from "styled-components";

const inputStyle = css`
  width: 100%;
  height: 60px;
  padding: 0 20px;
  background: #ffffff;
  border-radius: 16px;
  box-sizing: border-box;
  border: 1px solid #e4e4e4;
  color: #000;

  &,
  &::placeholder {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
  }

  &::placeholder {
    color: #65656d;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #7933d2;
  }
`;

export const Input = styled.input`
    ${inputStyle}
`;

export const Textarea = styled.textarea`
    ${inputStyle}
    height: 120px;
    padding: 20px;
    resize: vertical;
`;