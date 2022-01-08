import React from "react";
import { observer } from "mobx-react-lite";
import { useParams, Navigate, Link, useNavigate } from "react-router-dom";

import { ReactComponent as IconTrash } from "../components/icons/trash.svg";
import { ReactComponent as IconCopy } from "../components/icons/copy.svg";
import store from "../store";

import Card from "../components/Card";
import { H1, P } from "../components/typographic";
import { ActionButton, PureButton, StrokeButton } from "../components/button";
import { Container, SpaceBetween } from "../components/layout";
import * as S from "./styled";

const Course = () => {
  const params = useParams();
  const navigate = useNavigate();
  const course = store.getCourse(params.course);
  if (!course) return <Navigate to="/courses" />;

  return (
    <Container>
      <S.Header>
        <H1>Курс «{course.name}»</H1>

        <SpaceBetween>
          <Link to={`/courses/${course.id}/create`}>
            <StrokeButton>Опубликовать</StrokeButton>
          </Link>
          <Link style={{ marginLeft: 16 }} to={`/courses/${course.id}/create`}>
            <ActionButton>Создать тренировку</ActionButton>
          </Link>
        </SpaceBetween>
      </S.Header>

      <div>
        {course.workouts.map((workout, i) => (
          <Card
            number={i}
            title={workout.name}
            properties={[{ label: "Кол-во сетов", value: workout.sets.length }]}
            onClick={() => navigate(`/courses/${course.id}/${i}`)}
            actions={
              <div style={{ display: "flex" }}>
                <PureButton onClick={() => course.runClassroom(i)}>
                  <P>Запустить</P>
                </PureButton>

                <PureButton
                  style={{ marginLeft: 8 }}
                  onClick={() => course.cloneWorkout(i)}
                >
                  <IconCopy />
                </PureButton>

                <PureButton
                  style={{ marginLeft: 8 }}
                  onClick={() => course.removeWorkout(i)}
                >
                  <IconTrash />
                </PureButton>
              </div>
            }
          ></Card>
        ))}
      </div>
    </Container>
  );
};

export default observer(Course);
