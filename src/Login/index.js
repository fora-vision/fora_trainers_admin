import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { H1, PSmall } from "../components/typographic";
import { Container, VSpace } from "../components/layout";
import { ActionButton } from "../components/button";
import { Input } from "../components/input";
import store from "../store/index";
import { CenterBox } from "./styled";
import { Navigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (store.isLoged) {
    return <Navigate to="/" />;
  }

  let from = location.state?.from?.pathname || "/";
  const login = async () => {
    await store.login();
    navigate(from, { replace: true });
  };

  return (
    <CenterBox>
      <H1>Вход</H1>
      <VSpace s={56} />

      <Input placeholder="Email" />
      <VSpace s={16} />

      <Input placeholder="Пароль" />
      <VSpace s={32} />

      <ActionButton onClick={login}>Войти</ActionButton>
      <VSpace s={24} />

      <PSmall style={{ textAlign: "center", color: "#65656D" }}>
        Возникли вопросы?
        <br />
        Напишите нам: help@fora.vision
      </PSmall>
    </CenterBox>
  );
};

export default Login;
