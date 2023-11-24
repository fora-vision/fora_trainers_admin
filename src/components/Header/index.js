import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { useTranslation } from 'react-i18next'
import { observer } from "mobx-react-lite";
import { Switch, Typography } from "@mui/material";
import store from "../../store";
import { PureButton } from "../button";
import { P } from "../typographic";
import logoImage from "./logo.png";
import * as S from "./styled";
import i18n from "../../i18n";

function Header() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [isSwitchChecked, setIsSwitchChecked] = useState(false)
  const navigate = useNavigate();
  const logout = async () => {
    await store.logout();
    navigate("/login");
  };

  useEffect(() => {
    const language = i18n.language;
    if (language === 'ru') {
      setIsSwitchChecked(true)
    }
  }, [])
  const handleSwitch = () => {
    setIsSwitchChecked(!isSwitchChecked)
    if (isSwitchChecked) {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('ru');
    }
  }

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
        <S.SwitchLanguage>
          <Typography fontSize={14}>En</Typography>
          <Switch checked={isSwitchChecked} size="small" onClick={handleSwitch} />
          <Typography fontSize={14}>Ru</Typography>
        </S.SwitchLanguage>
        <PureButton style={{ marginLeft: "auto" }} onClick={logout}>
          <P>{t("components.header.logout")}</P>
        </PureButton>
      </S.Navigation>
    </S.Header>
  );
}

export default observer(Header);
