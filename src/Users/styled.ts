import styled, { keyframes } from "styled-components";
import { PureButton } from "../components/button";

const show = keyframes`
  from { height: 0px; }
  to { height: 432px; padding: 16px; }
`;

const hide = keyframes`
  from { height: 432px; }
  to { height: 0px; padding-top: 0; padding-bottom: 0; }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;

  button {
    width: 280px;
  }
`;

export const Workouts = styled.div<{ isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 16px;
  width: 100%;
  overflow: hidden;
  animation: ${(p) => (p.isOpen ? show : hide)} 0.5s forwards;

  background: #eae9f1;

  > div {
    border-radius: 16px;
    box-sizing: border-box;
    overflow-y: auto;
    height: 400px;
    padding: 0;
  }

  thead {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 18px;
    background: #fff;
    position: sticky;
    top: 0;
  }
`;

export const ExpandButton = styled(PureButton)<{ isExpanded: boolean }>`
  transition: 0.2s transform;
  transform: rotate(${(p) => (p.isExpanded ? "0deg" : "-90deg")});
`;

export const HeaderColumn = styled.th<{ isSorted: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    opacity: ${(p) => (p.isSorted ? 1 : 0)};
  }

  &:hover {
    button {
      opacity: ${(p) => (p.isSorted ? 0.8 : 0.5)} !important;
    }
  }
`;

export const TableRow = styled.tr<{ isSelected: boolean }>`
  transition: 0.2s background-color, 0.2s color;
  background-color: ${(p) => (p.isSelected ? "#5e7eaf" : "transparent")};
  color: ${(p) => (p.isSelected ? "white" : "black")};
  cursor: pointer;

  &:hover {
    background-color: ${(p) => (p.isSelected ? "#5e7eaf" : "#eff1ff")};
    color: ${(p) => (p.isSelected ? "white" : "black")};
  }
`;

export const SortButton = styled(PureButton)<{ isDesc: boolean }>`
  transition: 0.2s transform, 0.2s opacity;
  transform: rotate(${(p) => (p.isDesc ? "0deg" : "-180deg")});
`;

export const Video = styled.div`
  width: 500px;
  background: #000;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  height: 300px;
  margin-left: 16px;
  position: relative;
  overflow: hidden;

  button {
    position: absolute;
    top: 16px;
    right: 16px;
    svg * {
      fill: #fff;
    }
  }

  video {
    width: 100%;
    height: 100%;
  }
`;

export const Chart = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  height: 300px;
  margin-left: 16px;
  box-sizing: border-box;
  width: 500px;
  background: #fff;

  position: sticky;
  top: 0;
`;
