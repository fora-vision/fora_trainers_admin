import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { ReactComponent as IconTrash } from "../components/icons/trash.svg";
import { ReactComponent as IconCopy } from "../components/icons/copy.svg";

import { ActionButton, PureButton } from "../components/button";
import { Container } from "../components/layout";
import { H1 } from "../components/typographic";
import Card from "../components/Card";
import store from "../store";
import * as S from "./styled";
import { formatDate } from "../components/date";

const Courses = () => {
  const navigate = useNavigate();
  useEffect(() => {
    void store.loadCourses();
  }, []);

  return (
    <Container>
      <S.Header>
        <H1>Курсы тренировок</H1>
        <Link to="/courses/create">
          <ActionButton>Создать курс</ActionButton>
        </Link>
      </S.Header>

      <div>
        {store.courses.map((course, i) => (
          <Card
            key={course.id}
            number={i}
            title={course.name}
            properties={[
              { label: "Кол-во тренировок", value: course.workouts.length },
              { label: "Кол-во участников", value: 0 },
              {
                label: "Дедлайн",
                value: course.deadline && !course.isEditable
                  ? formatDate(course.deadline)
                  : "Не опубликован",
              },
            ]}
            onClick={() => navigate(`/courses/${course.id}`)}
            actions={
              <div style={{ display: "flex" }}>
                <PureButton onClick={() => store.cloneCourse(course.id)}>
                  <IconCopy />
                </PureButton>

                {course.isEditable && (
                  <PureButton
                    style={{ marginLeft: 8 }}
                    onClick={() => store.removeCourse(course.id)}
                  >
                    <IconTrash />
                  </PureButton>
                )}
              </div>
            }
          ></Card>
        ))}
      </div>
    </Container>
  );
};

export default observer(Courses);
