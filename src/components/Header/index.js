import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";
import store from "../../store";
import { PureButton } from "../button";
import { Container } from "../layout";
import { P } from "../typographic";
import logoImage from "./logo.png";
import * as S from "./styled";

function Header() {
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
        <S.HeaderButton to="/courses" isSelected={pathname.includes("course")}>
          <P>Курсы тренировок</P>
        </S.HeaderButton>
        <S.HeaderButton to="/people" isSelected={pathname.includes("people")}>
          <P>Список учеников</P>
        </S.HeaderButton>
        <PureButton style={{ marginLeft: "auto" }} onClick={logout}>
          <P>Выйти</P>
        </PureButton>
      </S.Navigation>
    </S.Header>
  );
}

export default observer(Header);
