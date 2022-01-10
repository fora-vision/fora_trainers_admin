import React, { useState } from "react";
import {  Navigate, useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import {
  ActionButton,
  Group,
  GroupButton,
} from "../components/button";
import { P, PBold } from "../components/typographic";
import { VSpace } from "../components/layout";
import Modal from "../components/Modal";
import Select from "../components/select";
import store from "../store";

function SetupExercise() {
  const params = useParams();
  const navigate = useNavigate();

  const course = store.getCourse(params.course);
  const workout = store.getWorkout(params.course, params.workout);
  const exercise = workout?.getExercise(params.set, params.exercise);
  const backPath = `/courses/${params.course}/${params.workout}`;

  const saveExercise = () => {
    if (exercise.isDraft) workout.saveDraftExercise(params.set);
    navigate(backPath, { replace: true });
  };

  if (course.isEditable === false || exercise == null) {
    return <Navigate to={backPath} replace />;
  }

  return (
    <Modal
      width={448}
      isOpen
      onClose={() => navigate(backPath, { replace: true })}
    >
      <PBold style={{ textAlign: "center" }}>
        {exercise.isDraft ? "Добавить упражнение" : "Редактировать"}
      </PBold>
      <VSpace s={40} />

      <Select
        placeholder="Название упражнения"
        items={store.getExercisesList()}
        onChange={(e) => exercise.setLabel(e.target.value)}
        value={exercise.label}
      />
      <VSpace s={16} />

      <Group>
        <GroupButton
          isSelected={exercise.type === "REPEATS"}
          onClick={() => exercise.setType("REPEATS")}
        >
          <P>Повторы</P>
        </GroupButton>
        <GroupButton
          isSelected={exercise.type === "TIME"}
          onClick={() => exercise.setType("TIME")}
        >
          <P>Минуты</P>
        </GroupButton>
      </Group>
      <VSpace s={16} />

      {exercise.type === "REPEATS" ? (
        <Select
          placeholder="Количество повторов"
          onChange={(e) => exercise.setValue(e.target.value)}
          value={exercise.value}
          items={[
            { value: "2", label: "2 повторов" },
            { value: "5", label: "5 повторов" },
            { value: "10", label: "10 повторов" },
            { value: "15", label: "15 повторов" },
            { value: "20", label: "20 повторов" },
            { value: "25", label: "25 повторов" },
            { value: "30", label: "30 повторов" },
          ]}
        />
      ) : (
        <Select
          placeholder="Время выполнения"
          onChange={(e) => exercise.setValue(e.target.value)}
          value={exercise.value}
          items={[
            { value: "15", label: "15 секунд" },
            { value: "30", label: "30 секунд" },
            { value: "45", label: "45 секунд" },
            { value: "60", label: "1 минута" },
          ]}
        />
      )}

      {/* 
        <VSpace s={24} />
        <SpaceBetween>
          <P>Модификаторы</P>
          <Link to="modifiers">
            <PureButton>
              <P>Добавить</P>
            </PureButton>
          </Link>
        </SpaceBetween>
      */}

      <VSpace s={32} />

      {exercise.isDraft && (
        <ActionButton onClick={saveExercise}>Добавить</ActionButton>
      )}
    </Modal>
  );
}

export default observer(SetupExercise);
