import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import useBreadcrumbs from "../components/useBreadcrumbs";
import { ActionButton } from "../components/button";
import { PBold } from "../components/typographic";
import { Input, Textarea } from "../components/input";
import { VSpace } from "../components/layout";
import Modal from "../components/Modal";

function RenameCourse() {
  const { isLoading, course } = useBreadcrumbs();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (course == null) return
    setName(course.name)
    setDescription(course.description)
  }, [course])

  if (isLoading) return null;
  if (!course || course.inviteCode) {
    return <Navigate to={course.path} replace />;
  }

  const isValid = name.length && description.length;

  const create = async () => {
    navigate(course.path, { replace: true });
    await course.updateCourse(name, description);
  };

  return (
    <Modal width={448} isOpen onClose={() => navigate(course.path, { replace: true })}>
      <PBold style={{ textAlign: "center" }}>Переименовать курс</PBold>
      <VSpace s={40} />
      <Input
        value={name}
        placeholder="Название курса"
        onChange={(e) => setName(e.target.value)}
      />
      <VSpace s={16} />
      <Textarea
        value={description}
        placeholder="Описание курса"
        onChange={(e) => setDescription(e.target.value)}
      />
      <VSpace s={24} />
      <ActionButton onClick={create} disabled={!isValid || isLoading}>
        Сохранить
      </ActionButton>
    </Modal>
  );
}

export default RenameCourse;
