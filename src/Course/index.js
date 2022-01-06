import React from "react";
import { observer } from "mobx-react-lite";
import { useParams, Navigate, Link, useNavigate } from "react-router-dom";

import { ReactComponent as IconTrash } from "../components/icons/trash.svg";
import { ReactComponent as IconCopy } from "../components/icons/copy.svg";
import store from "../store";

import Card from "../components/Card";
import { H1 } from "../components/typographic";
import { ActionButton, PureButton } from "../components/button";
import { Container } from "../components/layout";
import { formatDate } from "../components/date";

import * as S from "./styled";

const Course = () => {
  const params = useParams();
  const navigate = useNavigate();
  const course = store.getCourse(params.course);
  if (!course) return <Navigate to="/courses" />;

  return (
    <Container>
      <S.Header>
        <H1>Курс «{course.title}»</H1>
        <Link to={`/courses/${course.id}/create`}>
          <ActionButton>Создать тренировку</ActionButton>
        </Link>
      </S.Header>

      <div>
        {course.exercises.map((exercise, i) => (
          <Card
            number={i}
            title={exercise.title}
            properties={[
              { label: "Пол", value: exercise.sex },
              { label: "Дата создания", value: formatDate(exercise.created) },
              { label: "Кол-во сетов", value: exercise.sets.length },
            ]}
            onClick={() => navigate(`/courses/${course.id}/${exercise.id}`)}
            actions={
              <div style={{ display: "flex" }}>
                <PureButton>
                  <IconCopy />
                </PureButton>

                <PureButton style={{ marginLeft: 8 }}>
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
