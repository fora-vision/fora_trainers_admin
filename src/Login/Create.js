import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Toastify from "toastify-js";

import { H1, PSmall } from "../components/typographic";
import { VSpace } from "../components/layout";
import { ActionButton } from "../components/button";
import { Input } from "../components/input";
import store from "../store/index";
import { LoginForm } from "./styled";
import { Navigate } from "react-router";

const CreateAccount = () => {
  const { register, handleSubmit, formState } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const location = useLocation();

  if (store.isLoged) {
    return <Navigate to="/" />;
  }

  let from = location.state?.from?.pathname || "/";
  const create = async ({ name, organization, email, repeatPassword, password }) => {
    try {
      if (repeatPassword !== password) {
        Toastify({ text: "Пароли не совпадают", duration: 3000 }).showToast();
        return;
      }

      await store.create({ name, organization, email, password, login: email });
      navigate(from, { replace: true });
    } catch {
      Toastify({ text: "Не получилось создать аккаунт", duration: 3000 }).showToast();
    }
  };

  console.log(formState);

  return (
    <LoginForm onSubmit={handleSubmit(create)}>
      <H1>Регистрация</H1>
      <VSpace s={56} />

      <Input placeholder="Ваше имя" {...register("name", { required: true })} />

      <VSpace s={16} />

      <Input placeholder="Название организации" {...register("organization", { required: true })} />

      <VSpace s={16} />

      <Input placeholder="Email" autoComplete="username" {...register("email", { required: true })} />

      <VSpace s={16} />

      <Input
        type="password"
        placeholder="Пароль"
        isError={formState.errors["password"]}
        {...register("password", { required: true, minLength: 6 })}
      />

      <VSpace s={16} />

      <Input
        type="password"
        placeholder="Повторите пароль"
        isError={formState.errors["repeatPassword"]}
        {...register("repeatPassword", { required: true, minLength: 6 })}
      />

      <VSpace s={32} />

      <ActionButton disabled={!formState.isValid} type="submit">
        Создать аккаунт
      </ActionButton>

      <VSpace s={12} />

      <PSmall>
        <Link to="/login">Уже есть аккаунт? Авторизируйтесь</Link>
      </PSmall>

      <VSpace s={32} />

      <PSmall style={{ textAlign: "center", color: "#65656D" }}>
        Возникли вопросы?
        <br />
        Напишите нам: aborisova@fora.vision
      </PSmall>
    </LoginForm>
  );
};

export default CreateAccount;
