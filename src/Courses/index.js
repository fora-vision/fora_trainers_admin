import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useTranslation } from 'react-i18next'

import { ReactComponent as IconTrash } from "../components/icons/trash.svg";
import { ReactComponent as IconCopy } from "../components/icons/copy.svg";

import { formatDate } from "../components/date";
import { ActionButton, PureButton } from "../components/button";
import { Container } from "../components/layout";
import { H1, H2 } from "../components/typographic";
import Card from "../components/Card";
import store from "../store";
import * as S from "./styled";

const Courses = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    void store.loadCourses();
  }, []);

  const archived = store.courses.filter((c) => c.deadline && new Date(c.deadline) < Date.now());
  const active = store.courses.filter((c) => c.deadline && new Date(c.deadline) >= Date.now());
  const unpublish = store.courses.filter((c) => c.deadline === 0);

  const renderCard = (course, i) => (
    <Card
      key={course.id}
      number={i}
      title={course.name}
      properties={[
        { label: t("courses.index.numberOfWorkouts"), value: course.workouts.length },
        { label: t("courses.index.numberOfUsers"), value: course.usersCount },
        {
          label: t("courses.index.deadline"),
          value: course.deadline && !course.isEditable ? formatDate(course.deadline) : t("courses.index.notPublished"),
        },
      ]}
      onClick={() => navigate(`/courses/${course.id}`)}
      actions={
        <div style={{ display: "flex" }}>
          <PureButton onClick={() => store.cloneCourse(course.id)}>
            <IconCopy />
          </PureButton>

          {course.isEditable && (
            <PureButton style={{ marginLeft: 8 }} onClick={() => store.removeCourse(course.id)}>
              <IconTrash />
            </PureButton>
          )}
        </div>
      }
    />
  );

  return (
    <Container>
      <S.Header>
        <H1>{t("courses.index.courses")}</H1>
        <Link to="/courses/create">
          <ActionButton>{t("courses.index.createCourse")}</ActionButton>
        </Link>
      </S.Header>

      {unpublish.length > 0 && (
        <div>
          <H2>{t("courses.index.unpublished")}</H2>
          <br />
          {unpublish.map(renderCard)}
          <br />
        </div>
      )}

      {active.length > 0 && (
        <div>
          <H2>{t("courses.index.active")}</H2>
          <br />
          {active.map(renderCard)}
          <br />
        </div>
      )}

      {archived.length > 0 && (
        <div>
          <H2>{t("courses.index.completed")}</H2>
          <br />
          {archived.map(renderCard)}
          <br />
        </div>
      )}
    </Container>
  );
};

export default observer(Courses);
