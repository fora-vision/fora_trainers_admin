import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useTranslation } from 'react-i18next'

import useBreadcrumbs from "../components/useBreadcrumbs";
import { ActionButton } from "../components/button";
import { PBold, PSmall } from "../components/typographic";
import { Input, Textarea } from "../components/input";
import { VSpace } from "../components/layout";
import Modal from "../components/Modal";

function RenameCourse() {
  const { t } = useTranslation();
  const { isLoading, course } = useBreadcrumbs();
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (course == null) return;
    setName(course.name);
    setDescription(course.description);

    let date = new Date(course.deadline);
    let currentDate = date.toISOString().substring(0, 10);
    setDeadline(currentDate);
  }, [course]);

  if (isLoading) return null;
  if (!course) {
    return <Navigate to={course.path} replace />;
  }

  const isValid = name.length && description.length;

  const create = async () => {
    navigate(course.path, { replace: true });
    await course.updateCourse(name, description);
  };

  if (course.isEditable === false) {
    return (
      <Modal width={448} isOpen onClose={() => navigate(course.path, { replace: true })}>
        <PBold style={{ textAlign: "center" }}>{t("course.rename.editDeadline")}</PBold>
        <VSpace s={18} />
        <PSmall style={{ textAlign: "center" }}>
          {t("course.rename.setEndDate")}
        </PSmall>
        <VSpace s={8} />
        <Input
          value={deadline}
          type="date"
          placeholder={t("course.rename.endDatePlaceholder")}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <VSpace s={24} />
        <ActionButton onClick={create} disabled={isLoading}>
          {t("course.rename.save")}
        </ActionButton>
      </Modal>
    );
  }

  return (
    <Modal width={448} isOpen onClose={() => navigate(course.path, { replace: true })}>
      <PBold style={{ textAlign: "center" }}>{t("course.rename.renameCourse")}</PBold>
      <VSpace s={40} />
      <Input value={name} placeholder={t("course.rename.courseNamePlaceholder")} onChange={(e) => setName(e.target.value)} />
      <VSpace s={16} />
      <Textarea value={description} placeholder={t("course.rename.courseDescriptionPlaceholder")} onChange={(e) => setDescription(e.target.value)} />
      <VSpace s={24} />
      <ActionButton onClick={create} disabled={!isValid || isLoading}>
        {t("course.rename.save")}
      </ActionButton>
    </Modal>
  );
}

export default RenameCourse;
