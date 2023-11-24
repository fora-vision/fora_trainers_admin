import React from "react";
import { useTranslation } from 'react-i18next'
import { PBold, PSmall } from "../typographic";
import * as S from "./styled";

function Card({ onClick, number, title, properties, actions }) {
  const { t } = useTranslation();
  return (
    <S.Card onClick={onClick}>
      <S.Column>
        <PSmall>№</PSmall>
        <PBold>{number}</PBold>
      </S.Column>

      <S.Column style={{ marginLeft: 16, width: 272 }}>
        <PSmall>{t("components.card.title")}</PSmall>
        <PBold>{title}</PBold>
      </S.Column>

      <S.AdditionColumn>
        {properties.map((prop, i) => (
          <S.Column style={{ width: 164 }} key={i}>
            <PSmall>{prop.label}</PSmall>
            <PBold>{prop.value}</PBold>
          </S.Column>
        ))}

        {actions && (
          <S.Column style={{ width: 104, alignItems: "flex-end" }} onClick={(e) => e.stopPropagation()}>
            <PSmall>{t("components.card.actions")}</PSmall>
            {actions}
          </S.Column>
        )}
      </S.AdditionColumn>
    </S.Card>
  );
}

export default Card;
