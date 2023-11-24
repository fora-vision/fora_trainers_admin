import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";
import store from "../../store";
import { P, PBold, PSmall } from "../typographic";
import logoImage from "./logo.png";
import * as S from "./styled";

import { ChevronDown } from "@gravity-ui/icons";
import { ArrowRightFromSquare } from "@gravity-ui/icons";
import { CircleQuestion } from "@gravity-ui/icons";
import { Button, DropdownMenu, Link as UiLink, Icon, Card, Tooltip } from "@gravity-ui/uikit";

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const logout = async () => {
    await store.logout();
    navigate("/login");
  };

  if (!store.isLoged) return null;

  const format = (n) => {
    if (n >= 1_000_000) return `${Math.floor(n / 1_000_000)} Mлн`;
    return n;
  };

  return (
    <S.Header>
      <S.Navigation>
        <Link to="/" style={{ height: 40 }}>
          <S.Logo src={logoImage} />
        </Link>
        <S.HeaderButton to="/courses" $selected={pathname.includes("course")}>
          <P>Курсы тренировок</P>
        </S.HeaderButton>

        <div style={{ display: "flex", marginLeft: "auto", flexDirection: "row", gap: 32 }}>
          <div
            style={{ display: "flex", borderRight: "1px solid #ccc", paddingRight: 32, alignItems: "center", gap: 12 }}
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
                  <UiLink href="mailto:help@fora.vision">help@fora.vision</UiLink>
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
                action: () => window.open("mailto:help@fora.vision"),
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
      </S.Navigation>
    </S.Header>
  );
}

export default observer(Header);
