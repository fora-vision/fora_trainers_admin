import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { ReactComponent as IconTrash } from "../components/icons/trash.svg";
import { ReactComponent as IconEdit } from "../components/icons/edit.svg";

import { Input } from "../components/input";
import { ActionButton, PureButton, StrokeButton } from "../components/button";
import { Container, SpaceBetween, VSpace } from "../components/layout";
import { H1, H2, H3, P, PSmall } from "../components/typographic";
import store from "../store";
import * as S from "./styled";
import Select from "../components/select";

const Exercise = () => {
  const params = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isNew = params.exercise === "create";
  const [exercise, setExercise] = useState({});

  useEffect(() => {
    if (params.exercise === "create") return setExercise({});
    const exercise = store.getExercise(params.course, params.exercise);
    if (exercise) setExercise(exercise);
    else navigate(`/courses/${params.course}`);
  }, [navigate, params.exercise, params.course]);

  return (
    <Container>
      <VSpace s={56} />

      <H1>{isNew ? "Создать тренировку" : "Редактировать тренировку"}</H1>
      <VSpace s={40} />

      <H2>Общая информация</H2>
      <VSpace s={24} />

      <Input
        style={{ width: 448 }}
        placeholder="Название тренировки"
        defaultValue={exercise.title}
      />
      <VSpace s={16} />

      <Select
        style={{ width: 448 }}
        placeholder="Сложность тренировки"
        value="Разминка"
      />
      <VSpace s={40} />

      <H2>Сеты</H2>
      <VSpace s={24} />

      <S.SetCard>
        <SpaceBetween>
          <H3>СЕТ 1</H3>
          <PSmall>Количество повторов сета:</PSmall>
        </SpaceBetween>
        <VSpace s={36} />

        <S.HeaderRow>
          <PSmall>Упражнение</PSmall>
          <PSmall>Количество повторов/минут</PSmall>
          <PSmall>Модификаторы</PSmall>
          <PSmall>Действия</PSmall>
        </S.HeaderRow>

        <S.Row>
          <P>Берпи</P>
          <P>10 повторов</P>
          <P>2 модификатора</P>
          <div style={{ display: "flex" }}>
            <Link to={`${pathname}/0/0`}>
              <PureButton>
                <IconEdit />
              </PureButton>
            </Link>

            <PureButton style={{ marginLeft: 16 }}>
              <IconTrash />
            </PureButton>
          </div>
        </S.Row>

        <Link to={`${pathname}/0/new`}>
          <StrokeButton style={{ height: 40 }}>
            + Добавить упражнение
          </StrokeButton>
        </Link>
      </S.SetCard>

      <StrokeButton style={{ width: 904, height: 80 }}>
        + Добавить сет
      </StrokeButton>
      <VSpace s={40} />

      <ActionButton style={{ width: 343 }}>
        {isNew ? "Создать тренировку" : "Сохранить изменения"}
      </ActionButton>
    </Container>
  );
};

export default Exercise;
