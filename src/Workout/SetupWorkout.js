import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";

import { ReactComponent as IconTrash } from "../components/icons/trash.svg";
import { ReactComponent as IconEdit } from "../components/icons/edit.svg";

import { ActionButton, PureButton, StrokeButton } from "../components/button";
import { Container, SpaceBetween, VSpace } from "../components/layout";
import { H1, H2, H3, P, PSmall } from "../components/typographic";
import { Input } from "../components/input";
import store from "../store";
import * as S from "./styled";

const SetupWorkout = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const backPath = `/courses/${params.course}`;
  const course = store.getCourse(params.course);
  const workout = store.getWorkout(params.course, params.workout);
  const saveWorkout = async () => {
    if (workout.isDraft) await course.saveDraftWorkout();
    else await course.save();
    navigate(backPath);
  };

  if (workout == null) {
    return <Navigate to={backPath} />;
  }

  return (
    <Container>
      <VSpace s={56} />

      <H1>
        {workout.isDraft ? "Создать тренировку" : "Редактировать тренировку"}
      </H1>
      <VSpace s={40} />

      <H2>Общая информация</H2>
      <VSpace s={24} />

      <Input
        style={{ width: 448 }}
        placeholder="Название тренировки"
        onChange={(e) => workout.setName(e.target.value)}
        value={workout.name}
      />
      <VSpace s={40} />

      <H2>Сеты</H2>
      <VSpace s={24} />

      {workout.sets.map((set, setIndex) => (
        <S.SetCard>
          <SpaceBetween>
            <SpaceBetween>
              <H3>СЕТ {setIndex + 1}</H3>
              <PureButton
                style={{ marginLeft: 16 }}
                onClick={() => workout.removeSet(setIndex)}
              >
                <IconTrash />
              </PureButton>
            </SpaceBetween>

            <SpaceBetween>
              <PSmall>Количество повторов сета:</PSmall>
              <S.RepeatsSelect
                value={set.repeats}
                items={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "4", label: "4" },
                  { value: "5", label: "5" },
                ]}
                onChange={(e) =>
                  workout.changeSetRepeats(setIndex, e.target.value)
                }
              />
            </SpaceBetween>
          </SpaceBetween>
          <VSpace s={36} />

          <S.HeaderRow>
            <PSmall>Упражнение</PSmall>
            <PSmall>Количество повторов/минут</PSmall>
            <PSmall>Модификаторы</PSmall>
            <PSmall>Действия</PSmall>
          </S.HeaderRow>

          {set.exercises.map((ex, exIndex) => (
            <S.Row>
              <P>{store.getExerciseName(ex.label)}</P>
              <P>{ex.getExecuteValue()}</P>
              <P>{ex.modificators.length} модификатора</P>
              <div style={{ display: "flex" }}>
                <Link to={`${pathname}/${setIndex}/${exIndex}`}>
                  <PureButton>
                    <IconEdit />
                  </PureButton>
                </Link>

                <PureButton
                  style={{ marginLeft: 16 }}
                  onClick={() => workout.removeExercise(setIndex, exIndex)}
                >
                  <IconTrash />
                </PureButton>
              </div>
            </S.Row>
          ))}

          <Link to={`${pathname}/${setIndex}/create`}>
            <StrokeButton style={{ height: 40 }}>
              + Добавить упражнение
            </StrokeButton>
          </Link>
        </S.SetCard>
      ))}

      <StrokeButton
        style={{ width: 904, height: 80 }}
        onClick={() => workout.addSet()}
      >
        + Добавить сет
      </StrokeButton>
      <VSpace s={40} />

      <ActionButton style={{ width: 343 }} onClick={saveWorkout}>
        {workout.isDraft ? "Создать тренировку" : "Сохранить изменения"}
      </ActionButton>
    </Container>
  );
};

export default observer(SetupWorkout);
