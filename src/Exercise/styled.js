import styled from "styled-components";

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
  color: #65656D;

  > * {
    width: 240px;
  }
  
  > *:last-child {
    width: 72px;
  }

  > * + * {
    margin-left: 16px;
  }
`

export const Row = styled(HeaderRow)`
  border-top: 1px solid #E4E4E4;
  padding: 26px 0;
  color: #020209;
`