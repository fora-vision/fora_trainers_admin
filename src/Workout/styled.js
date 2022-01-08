import styled from "styled-components";
import Select from "../components/select";

export const SetCard = styled.div`
  width: 904px;
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
`;

export const HeaderRow = styled.div`
  padding-bottom: 16px;
  display: flex;
  color: #65656d;

  > * {
    width: 240px;
  }

  > *:last-child {
    width: 72px;
  }

  > * + * {
    margin-left: 16px;
  }
`;

export const Row = styled(HeaderRow)`
  border-top: 1px solid #e4e4e4;
  text-transform: capitalize;
  padding: 26px 0;
  color: #020209;
`;

export const RepeatsSelect = styled(Select)`
  height: 32px;
  width: 82px;
  border-radius: 8px;
  margin-left: 16px;

  select {
    padding-top: 0;
  }

  button {
    top: 4px;
    right: 12px;
  }

  span {
    display: none;
  }
`;
