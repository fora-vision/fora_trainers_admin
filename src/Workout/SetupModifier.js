import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from 'react-i18next'
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { VSpace } from "../components/layout";
import { PBold } from "../components/typographic";
import { ActionButton } from "../components/button";
import useBreadcrumbs from "../components/useBreadcrumbs";
import Select from "../components/select";
import Modal from "../components/Modal";

function SetupModifier() {
  const params = useParams();
  const { t } = useTranslation();
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
      <PBold style={{ textAlign: "center" }}>{modificator.isDraft ? t("workout.setupModifier.add") : t("workout.setupModifier.edit")} {t("workout.setupModifier.modificator")}</PBold>
      <VSpace s={40} />

      <Select
        disabled={!course.isEditable}
        placeholder={t("workout.setupModifier.forGenderPlaceholder")}
        value={modificator.sex}
        onChange={(e) => modificator.setGender(+e.target.value)}
        items={[
          { value: null, label: t("workout.setupModifier.forEveryone") },
          { value: 1, label: t("workout.setupModifier.forMale") },
          { value: 2, label: t("workout.setupModifier.forFemale") },
        ]}
      />
      <VSpace s={16} />

      <Select
        disabled={!course.isEditable}
        placeholder={t("workout.setupModifier.physique")}
        value={modificator.bodyType}
        onChange={(e) => modificator.setBodyType(e.target.value)}
        items={[
          { value: null, label: t("workout.setupModifier.any") },
          { value: "weak", label: t("workout.setupModifier.complete") },
          { value: "normal", label: t("workout.setupModifier.normal") },
          { value: "strong", label: t("workout.setupModifier.strong") },
        ]}
      />
      <VSpace s={16} />

      <Select
        disabled={!course.isEditable}
        value={modificator.type}
        placeholder={t("workout.setupModifier.modificatorTypePlaceholder")}
        onChange={(e) => modificator.setType(e.target.value)}
        items={[
          { value: "SKIP", label: t("workout.setupModifier.skipExercise") },
          { value: "COMPLICATE", label: t("workout.setupModifier.complicate") },
          { value: "SIMPLIFY", label: t("workout.setupModifier.simplify") },
        ]}
      />

      {modificator.type !== "SKIP" && (
        <>
          <VSpace s={16} />
          <Select
            disabled={!course.isEditable}
            onChange={(e) => modificator.setValue(+e.target.value)}
            placeholder={`${t("workout.setupModifier.value")} ${modificator.type === "COMPLICATE" ? t("workout.setupModifier.complications") : t("workout.setupModifier.simplifications")}`}
            value={modificator.value}
            items={[
              { value: 5, label: `${t("workout.setupModifier.by")} 5%` },
              { value: 10, label: `${t("workout.setupModifier.by")} 10%` },
              { value: 15, label: `${t("workout.setupModifier.by")} 15%` },
              { value: 20, label: `${t("workout.setupModifier.by")} 20%` },
            ]}
          />
        </>
      )}

      {course.isEditable && (
        <>
          <VSpace s={32} />
          <ActionButton onClick={submit}>{modificator.isDraft ? t("workout.setupModifier.add") : t("workout.setupModifier.edit")}</ActionButton>
        </>
      )}
    </Modal>
  );
}

export default observer(SetupModifier);
