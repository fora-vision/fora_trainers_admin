import styled from "styled-components";

export const PureButton = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  cursor: pointer;
  flex-shrink: 0;
  padding: 0;

  background: transparent;
`;

export const ActionButton = styled(PureButton)`
  width: 100%;
  transition: 0.2s background;
  background: #7933d2;
  border-radius: 16px;
  height: 56px;
  padding: 0 12px;
  color: #fff;

  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 15px;
  text-align: center;

  &:hover {
    background: #7933d2;
  }

  &:disabled {
    cursor: default;
    color: #65656d;
    background: #b8b8b8;
  }
`;

export const Group = styled.div`
  width: 100%;
  height: 56px;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  border-radius: 16px;
  display: flex;
`;

export const GroupButton = styled(PureButton)`
  background: ${(p) => (p.isSelected ? "#020209" : "#fff")};
  color: ${(p) => (p.isSelected ? "#fff" : "#000")};
  border-radius: 16px;
  height: 100%;
  width: 50%;
`;

export const StrokeButton = styled(PureButton)`
  width: 100%;
  transition: 0.2s background;
  background: transparent;
  border-radius: 16px;
  height: 56px;
  padding: 0 12px;
  color: #020209;
  border: 1px solid #020209;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  text-align: center;

  &:disabled {
    cursor: default;
    color: #65656d;
    border-color: #65656d;
  }
`;
