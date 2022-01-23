import React from "react";
import { observer } from "mobx-react-lite";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { VSpace } from "../components/layout";
import { PBold } from "../components/typographic";
import { ActionButton } from "../components/button";
import useBreadcrumbs from "../components/useBreadcrumbs";
import Select from "../components/select";
import Modal from "../components/Modal";

function SetupModifier() {
  const params = useParams();
  const { isLoading, course, exercise, workout, modificator } = useBreadcrumbs();
  const navigate = useNavigate();

  if (isLoading) return <Modal width={448} height={300} isOpen />;
  if (!course) return <Navigate to="/courses" replace />;
  if (!workout) return <Navigate to={course.path} replace />;

  const workoutPath = course.path + "/" + params.workout;
  if (!exercise) return <Navigate to={workoutPath} replace />;

  const modifiersPath = workoutPath + "/" + params.set + "/" + params.exercise + "/modifiers";
  if (!modificator || (modificator.isDraft && course.isEditable === false)) {
    return <Navigate to={workoutPath} replace />;
  }

  const close = () => navigate(workoutPath, { replace: true });
  const back = () => navigate(modifiersPath, { replace: true });
  const submit = () => {
    if (modificator.isDraft) exercise.saveDraftModificator();
    back();
  };

  return (
    <Modal width={448} isOpen closeButton={<></>} onClose={close} onBack={exercise.modificators.length ? back : null}>
      <PBold style={{ textAlign: "center" }}>{modificator.isDraft ? "Добавить" : "Редактировать"} модификатор</PBold>
      <VSpace s={40} />

      <Select
        disabled={!course.isEditable}
        placeholder="Для какого пола"
        value={modificator.sex}
        onChange={(e) => modificator.setGender(+e.target.value)}
        items={[
          { value: null, label: "Для всех" },
          { value: 1, label: "Для мужчин" },
          { value: 2, label: "Для женщин" },
        ]}
      />
      <VSpace s={16} />

      <Select
        disabled={!course.isEditable}
        placeholder="Телосложение"
        value={modificator.bodyType}
        onChange={(e) => modificator.setBodyType(e.target.value)}
        items={[
          { value: null, label: "Любое" },
          { value: "weak", label: "Полное" },
          { value: "normal", label: "Обычное" },
          { value: "strong", label: "Подтянутое" },
        ]}
      />
      <VSpace s={16} />

      <Select
        disabled={!course.isEditable}
        value={modificator.type}
        placeholder="Тип модификатора"
        onChange={(e) => modificator.setType(e.target.value)}
        items={[
          { value: "SKIP", label: "Пропуск упражнения" },
          { value: "COMPLICATE", label: "Усложнение" },
          { value: "SIMPLIFY", label: "Упрощение" },
        ]}
      />

      {modificator.type !== "SKIP" && (
        <>
          <VSpace s={16} />
          <Select
            disabled={!course.isEditable}
            onChange={(e) => modificator.setValue(+e.target.value)}
            placeholder={`Величина ${modificator.type === "COMPLICATE" ? "усложнения" : "упрощения"}`}
            value={modificator.value}
            items={[
              { value: 5, label: "на 5%" },
              { value: 10, label: "на 10%" },
              { value: 15, label: "на 15%" },
              { value: 20, label: "на 20%" },
            ]}
          />
        </>
      )}

      {course.isEditable && (
        <>
          <VSpace s={32} />
          <ActionButton onClick={submit}>{modificator.isDraft ? "Добавить" : "Редактировать"}</ActionButton>
        </>
      )}
    </Modal>
  );
}

export default observer(SetupModifier);
