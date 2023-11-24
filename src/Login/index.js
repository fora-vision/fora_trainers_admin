import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";
import Toastify from "toastify-js";
import { useTranslation } from "react-i18next";

import { H1, PSmall } from "../components/typographic";
import { VSpace } from "../components/layout";
import { ActionButton } from "../components/button";
import { Input } from "../components/input";
import store from "../store/index";
import { LoginForm } from "./styled";

const Login = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const location = useLocation();

  if (store.isLoged) {
    return <Navigate to="/" />;
  }

  let from = location.state?.from?.pathname || "/";
  const login = async ({ login, password }) => {
    try {
      await store.login(login, password);
      navigate(from, { replace: true });
    } catch {
      Toastify({ text: "Something wrong", duration: 3000 }).showToast();
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit(login)}>
      <H1>{t("login.index.login")}</H1>
      <VSpace s={56} />

      <Input
        placeholder={t("login.index.emailPlaceholder")}
        autoComplete="username"
        {...register("login", { required: true })}
      />
      <VSpace s={16} />

      <Input
        type="password"
        placeholder={t("login.index.passwordPlaceholder")}
        autoComplete="current-password"
        {...register("password", { required: true })}
      />
      <VSpace s={32} />

      <ActionButton disabled={!formState.isValid} type="submit">
        {t("login.index.logon")}
      </ActionButton>

      <VSpace s={12} />

      <PSmall>
        <Link to="/auth">Нет аккаунта? Зарегистрируйтесь</Link>
      </PSmall>

      <VSpace s={32} />

      <PSmall style={{ textAlign: "center", color: "#65656D" }}>
        {t("login.index.questions")}?
        <br />
        {t("login.index.writeUs")}: help@fora.vision
      </PSmall>
    </LoginForm>
  );
};

export default Login;
