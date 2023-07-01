import React, { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next'
import { observer } from "mobx-react-lite";

import { ReactComponent as IconTrash } from "../components/icons/trash.svg";
import { ReactComponent as IconEdit } from "../components/icons/edit.svg";

import Modal from "../components/Modal";
import { SpaceBetween, VSpace } from "../components/layout";
import { P, PBold } from "../components/typographic";
import { ActionButton, PureButton } from "../components/button";
import useBreadcrumbs from "../components/useBreadcrumbs";

function Modifiers() {
  const params = useParams();
  const { t } = useTranslation();
  const { isLoading, course, exercise, workout } = useBreadcrumbs();
  const navigate = useNavigate();

  if (isLoading) return <Modal width={448} isOpen />;
  if (!course) return <Navigate to="/courses" replace />;
  if (!workout) return <Navigate to={course.path} replace />;

  const workoutPath = course.path + "/" + params.workout;
  if (!exercise) return <Navigate to={workoutPath} replace />;
  if (exercise.modificators.length === 0) return <Navigate to="create" replace />;

  return (
    <Modal width={448} isOpen onClose={() => navigate(workoutPath, { replace: true })}>
      <PBold style={{ textAlign: "center" }}>{t("workout.modifiers.modifiers")}</PBold>
      <VSpace s={40} />

      {exercise.modificators.map((mod, modIndex) => (
        <SpaceBetween
          key={modIndex}
          style={{
            padding: "12px 12px 12px 16px",
            background: "#F4F3F6",
            borderRadius: 16,
            marginBottom: 16,
          }}
        >
          <P>{mod.formattedName}</P>
          <SpaceBetween>
            <Link to={`${modIndex}`}>
              <PureButton>
                <IconEdit />
              </PureButton>
            </Link>

            <PureButton style={{ marginLeft: 16 }} onClick={() => exercise.removeModificator(modIndex)}>
              <IconTrash />
            </PureButton>
          </SpaceBetween>
        </SpaceBetween>
      ))}

      <VSpace s={8} />

      <Link to="create">
        <ActionButton>{t("workout.modifiers.addMore")}</ActionButton>
      </Link>
    </Modal>
  );
}

export default observer(Modifiers);
