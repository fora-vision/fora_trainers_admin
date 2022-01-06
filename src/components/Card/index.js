import React from "react";
import { PBold, PSmall } from "../typographic";
import * as S from "./styled";

function Card({ onClick, number, title, properties, actions }) {
  return (
    <S.Card onClick={onClick}>
      <S.Column>
        <PSmall>№</PSmall>
        <PBold>{number}</PBold>
      </S.Column>

      <S.Column style={{ marginLeft: 16, width: 272 }}>
        <PSmall>Название</PSmall>
        <PBold>{title}</PBold>
      </S.Column>

      <S.AdditionColumn>
        {properties.map((prop, i) => (
          <S.Column style={{ width: 164 }} key={i}>
            <PSmall>{prop.label}</PSmall>
            <PBold>{prop.value}</PBold>
          </S.Column>
        ))}

        <S.Column
          style={{ width: 104, alignItems: "flex-end" }}
          onClick={(e) => e.stopPropagation()}
        >
          <PSmall>Действия</PSmall>
          {actions}
        </S.Column>
      </S.AdditionColumn>
    </S.Card>
  );
}

export default Card;
