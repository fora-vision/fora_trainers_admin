import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { P, PBold, PSmall } from "../typographic";
import store from "../../store";
import i18n from "../../i18n";

import logoImage from "./logo.png";
import * as S from "./styled";

import { ChevronDown } from "@gravity-ui/icons";
import { ArrowRightFromSquare } from "@gravity-ui/icons";
import { CircleQuestion } from "@gravity-ui/icons";
import { Globe } from "@gravity-ui/icons";
import { Button, DropdownMenu, Link as UiLink, Icon, Card, Tooltip, Switch } from "@gravity-ui/uikit";

function Header() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const navigate = useNavigate();
  const logout = async () => {
    await store.logout();
    navigate("/login");
  };

  useEffect(() => {
    const language = i18n.language;
    if (language === "ru") {
      setIsSwitchChecked(true);
    }
  }, []);

  const handleSwitch = () => {
    setIsSwitchChecked(!isSwitchChecked);
    if (isSwitchChecked) {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("ru");
    }
  };

  const format = (n) => {
    if (n >= 1_000_000) return `${Math.floor(n / 1_000_000)} Mлн`;
    return n;
  };

  if (!store.isLoged) {
    return (
      <S.Header>
        <S.Navigation>
          <Link to="/" style={{ height: 40, marginRight: "auto" }}>
            <S.Logo src={logoImage} />
          </Link>

          <DropdownMenu
            size="xl"
            popupProps={{ placement: "bottom-end" }}
            icon={<Icon size="24" data={Globe} />}
            items={[
              { action: () => handleSwitch(), text: `RU` },
              { action: () => handleSwitch(), text: "EN" },
            ]}
          />
        </S.Navigation>
      </S.Header>
    );
  }

  return (
    <S.Header>
      <S.Navigation>
        <Link to="/" style={{ height: 40 }}>
          <S.Logo src={logoImage} />
        </Link>
        <S.HeaderButton to="/courses" $selected={pathname.includes("course")}>
          <P>{t("components.header.courses")}</P>
        </S.HeaderButton>

        {store.user != null && (
          <div style={{ display: "flex", marginLeft: "auto", flexDirection: "row", gap: 32 }}>
            <div
              style={{
                display: "flex",
                borderRight: "1px solid #ccc",
                paddingRight: 32,
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  height: "auto",
                  flexDirection: "column",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <PBold style={{ textAlign: "right" }}>{format(store.user.free_time)}</PBold>
                <PSmall style={{ color: "rgb(101, 101, 109)", textAlign: "right" }}>минут</PSmall>
              </div>

              <Tooltip
                closeDelay={1000}
                content={
                  <Card style={{ width: 300 }}>
                    Хотите больше минут для ваших тренировок? Напишите нам на почту{" "}
                    <UiLink href="mailto:aborisova@fora.vision">help@fora.vision</UiLink>
                  </Card>
                }
              >
                <Icon size={24} data={CircleQuestion} />
              </Tooltip>
            </div>

            <DropdownMenu
              size="xl"
              popupProps={{ placement: "bottom-end" }}
              items={[
                {
                  action: () => handleSwitch(),
                  iconStart: <Icon data={Globe} />,
                  text: `Switch lang | ${isSwitchChecked ? "EN" : "RU"}`,
                },
                {
                  action: () => window.open("mailto:aborisova@fora.vision"),
                  iconStart: <Icon data={CircleQuestion} />,
                  text: "Email Support",
                },
                { action: logout, text: "Logout", theme: "danger", iconStart: <Icon data={ArrowRightFromSquare} /> },
              ]}
              renderSwitcher={(props) => (
                <Button {...props} view="flat" style={{ height: "auto", padding: "4px 0 8px" }}>
                  <div style={{ flexDirection: "row", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ textAlign: "right" }}>
                      <P>{store.user.name}</P>
                      <PSmall style={{ color: "rgb(101, 101, 109)", textAlign: "right" }}>
                        {store.user.organization}
                      </PSmall>
                    </div>
                    <Icon data={ChevronDown} />
                  </div>
                </Button>
              )}
            />
          </div>
        )}
      </S.Navigation>
    </S.Header>
  );
}

export default observer(Header);
