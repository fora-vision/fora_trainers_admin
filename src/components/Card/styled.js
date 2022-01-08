import styled from "styled-components";

export const Card = styled.div`
  background: #ffffff;
  box-shadow: 0px 8px 24px rgba(2, 2, 9, 0.07);
  border-radius: 16px;
  width: 100%;
  padding: 16px 32px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  cursor: pointer;

  transition: 0.2s box-shadow;
  &:hover {
    box-shadow: 0px 8px 24px rgba(2, 2, 9, 0.15);
  }
`;

export const AdditionColumn = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
  flex-shrink: 0;

  > *:first-child {
    color: #65656d;
  }

  > * + * {
    margin-top: 12px;
  }
`;
