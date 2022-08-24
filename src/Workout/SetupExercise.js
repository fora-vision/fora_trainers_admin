import React from "react";
import {  Navigate, useNavigate, useParams } from "react-router-dom";
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
      <PBold style={{ textAlign: "center" }}>{exercise.isDraft ? "Добавить упражнение" : "Редактировать"}</PBold>
      <VSpace s={40} />

      <Select
        placeholder="Название упражнения"
        items={store.getExercisesList()}
        onChange={(e) => exercise.setLabel(e.target.value)}
        value={exercise.label}
      />
      <VSpace s={16} />

      <Input
        type="number"
        placeholder={exercise.type === "REPEATS" ? "Количество повторов" : "Время выполнения"}
        onChange={(e) => exercise.setValue(isNaN(+e.target.value) ? 0 : Math.max(0, +e.target.value))}
        value={exercise.value || ""}
      />

      <VSpace s={24} />
      <ActionButton onClick={saveExercise}>{exercise.isDraft ? "Добавить" : "Сохранить"}</ActionButton>
    </Modal>
  );
}

export default observer(SetupExercise);
