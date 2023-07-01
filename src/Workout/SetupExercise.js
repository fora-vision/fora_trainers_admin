import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next'
import { observer } from "mobx-react-lite";

import useBreadcrumbs from "../components/useBreadcrumbs";
import { ActionButton } from "../components/button";
import { PBold } from "../components/typographic";
import { VSpace } from "../components/layout";
import { Input } from "../components/input";
import Modal from "../components/Modal";
import Select from "../components/select";
import store from "../store";

function SetupExercise() {
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLoading, course, workout, exercise } = useBreadcrumbs();

  if (isLoading) return <Modal width={448} height={300} isOpen />;
  if (!course) return <Navigate to="/courses" replace />;
  if (!workout) return <Navigate to={course.path} replace />;

  const workoutPath = course.path + "/" + params.workout;
  if (course.isEditable === false || !exercise) {
    return <Navigate to={workoutPath} replace />;
  }

  const saveExercise = () => {
    if (exercise.isDraft) workout.saveDraftExercise(params.set);
    navigate(workoutPath, { replace: true });
  };

  return (
    <Modal width={448} isOpen onClose={() => navigate(workoutPath, { replace: true })}>
      <PBold style={{ textAlign: "center" }}>{exercise.isDraft ? t("workout.setupExercise.addExercise") : t("workout.setupExercise.edit")}</PBold>
      <VSpace s={40} />

      <Select
        placeholder={t("workout.setupExercise.exerciseNamePlaceholder")}
        items={store.getExercisesList()}
        onChange={(e) => exercise.setLabel(e.target.value)}
        value={exercise.label}
      />
      <VSpace s={16} />

      <Input
        type="number"
        placeholder={exercise.type === "REPEATS" ? t("workout.setupExercise.numberOfRepetitions") : t("workout.setupExercise.executionTime")}
        onChange={(e) => exercise.setValue(isNaN(+e.target.value) ? 0 : Math.max(0, +e.target.value))}
        value={exercise.value || ""}
      />

      <VSpace s={24} />
      <ActionButton onClick={saveExercise}>{exercise.isDraft ? t("workout.setupExercise.add") : t("workout.setupExercise.save")}</ActionButton>
    </Modal>
  );
}

export default observer(SetupExercise);
