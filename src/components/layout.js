import styled from "styled-components";

export const Container = styled.div`
  margin: auto;
  width: 1200px;
  box-sizing: border-box;
  padding-top: 80px;
  padding-bottom: 160px;
`;

export const SpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const VSpace = styled.div`
  height: ${(p) => (typeof p.s == "string" ? p.s : p.s + "px" || 0)};
`;
