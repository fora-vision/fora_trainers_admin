import React from "react";
import { useTranslation } from 'react-i18next'
import { observer } from "mobx-react-lite";
import { Navigate, Link, useNavigate } from "react-router-dom";

import { ReactComponent as IconTrash } from "../components/icons/trash.svg";
import { ReactComponent as IconCopy } from "../components/icons/copy.svg";
import { ReactComponent as IconEdit } from "../components/icons/edit.svg";

import Card from "../components/Card";
import { H1, P } from "../components/typographic";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ActionButton, PureButton, StrokeButton } from "../components/button";
import { Container, SpaceBetween } from "../components/layout";
import * as S from "./styled";
import useBreadcrumbs from "../components/useBreadcrumbs";

const Course = () => {
  const { t } = useTranslation();
  const { isLoading, course } = useBreadcrumbs();
  const navigate = useNavigate();

  if (isLoading) return null;
  if (!course) return <Navigate to="/courses" />;

  return (
    <Container>
      <S.Header>
        <div>
          <Breadcrumbs>
            <Link to="/courses">{t("course.index.breadCourses")}</Link>
          </Breadcrumbs>
          <H1 style={{ marginRight: 32 }}>{t("course.index.title")} «{course.name}»</H1>
        </div>

        {course.isEditable ? (
          <SpaceBetween>
            <Link to={`/courses/${course.id}/rename`}>
              <StrokeButton style={{ width: 55, marginRight: 16 }}>
                <IconEdit />
              </StrokeButton>
            </Link>
            <Link to={`/courses/${course.id}/publish`}>
              <StrokeButton style={{ width: 160 }}>{t("course.index.buttons.publish")}</StrokeButton>
            </Link>
            <Link style={{ marginLeft: 16 }} to={`/courses/${course.id}/create`}>
              <ActionButton style={{ width: 220 }}>{t("course.index.buttons.create")}</ActionButton>
            </Link>
          </SpaceBetween>
        ) : (
          <SpaceBetween>
            <Link to={`/courses/${course.id}/rename`}>
              <StrokeButton style={{ width: 55, marginRight: 16 }}>
                <IconEdit />
              </StrokeButton>
            </Link>
            <Link to={`/courses/${course.id}/users`}>
              <StrokeButton>{t("course.index.users")} ({course.usersCount})</StrokeButton>
            </Link>
            <StrokeButton as="div" style={{ marginLeft: 16, width: "fit-content" }}>
              {t("course.index.inviteCode")}: {course.inviteCode}
            </StrokeButton>
          </SpaceBetween>
        )}
      </S.Header>

      <div>
        {course.workouts.map((workout, i) => {
          return (
            <Card
              key={i}
              number={i}
              title={workout.name || t("course.index.unspecified")}
              properties={[{ label: t("course.index.numbersOfSets"), value: workout.sets.length }]}
              onClick={() => navigate(`/courses/${course.id}/${i}`)}
              actions={
                <div style={{ display: "flex" }}>
                  <PureButton onClick={() => course.runClassroom(i)}>
                    <P>{t("course.index.launch")}</P>
                  </PureButton>

                  {course.isEditable && (
                    <>
                      <PureButton style={{ marginLeft: 8 }} onClick={() => course.cloneWorkout(i)}>
                        <IconCopy />
                      </PureButton>
                      <PureButton style={{ marginLeft: 8 }} onClick={() => course.removeWorkout(i)}>
                        <IconTrash />
                      </PureButton>
                    </>
                  )}
                </div>
              }
            />
          );
        })}
      </div>
    </Container>
  );
};

export default observer(Course);
