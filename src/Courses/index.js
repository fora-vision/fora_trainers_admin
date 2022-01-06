import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ActionButton, PureButton } from "../components/button";
import { formatDate } from "../components/date";
import { Container } from "../components/layout";
import { H1, PSmall } from "../components/typographic";
import Card from "../components/Card";
import store from "../store";
import * as S from "./styled";

const Courses = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <S.Header>
        <H1>Курсы тренировок</H1>
        <Link to="/courses/create">
          <ActionButton>Создать тренировку</ActionButton>
        </Link>
      </S.Header>

      <div>
        {store.courses.map((course, i) => (
          <Card
            key={course.id}
            number={i}
            title={course.title}
            properties={[
              { label: "Дата создания", value: formatDate(course.created) },
              { label: "Кол-во тренировок", value: course.exercises.length },
            ]}
            onClick={() => navigate(`/courses/${course.id}`)}
            actions={
              <PureButton>
                <PSmall style={{ color: "#EF7A6D" }}>Удалить</PSmall>
              </PureButton>
            }
          ></Card>
        ))}
      </div>
    </Container>
  );
};

export default Courses;
