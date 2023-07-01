import React from "react";
import { useNavigate } from "react-router";
import { useTranslation } from 'react-i18next'
import { observer } from "mobx-react-lite";
import { Link, useLocation } from "react-router-dom";
import store from "../../store";
import { PureButton } from "../button";
import { Container } from "../layout";
import { P } from "../typographic";
import logoImage from "./logo.png";
import * as S from "./styled";

function Header() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const logout = async () => {
    await store.logout();
    navigate("/login");
  };

  if (!store.isLoged) return null;

  return (
    <S.Header>
      <S.Navigation>
        <Link to="/" style={{ height: 40 }}>
          <S.Logo src={logoImage} />
        </Link>
        <S.HeaderButton to="/courses" $selected={pathname.includes("course")}>
          <P>{t("components.header.courses")}</P>
        </S.HeaderButton>
        <PureButton style={{ marginLeft: "auto" }} onClick={logout}>
          <P>{t("components.header.logout")}</P>
        </PureButton>
      </S.Navigation>
    </S.Header>
  );
}

export default observer(Header);
