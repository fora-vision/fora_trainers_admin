import React from "react";
import styled from "styled-components";

export const Breadcrumbs = styled.div`
  display: flex;

  a {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #65656d;

    display: flex;
    align-items: center;
  }

  a:hover {
    color: #020209;
  }

  a + a {
    &::before {
      content: "";
      background: #020209;
      margin: 0 8px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      display: block;
    }
  }
`;
