import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import useBreadcrumbs from "../components/useBreadcrumbs";
import { ActionButton } from "../components/button";
import { P, PBold, PSmall } from "../components/typographic";
import { Input } from "../components/input";
import { VSpace } from "../components/layout";
import Modal from "../components/Modal";

function PublishCourse() {
  const { isLoading, course } = useBreadcrumbs();
  const [deadline, setDeadline] = useState("");
  const navigate = useNavigate();

  if (isLoading) return null;
  if (!course || course.inviteCode) {
    return <Navigate to={course.path} replace />;
  }

  const create = async () => {
    navigate(course.path, { replace: true });
    await course.publicate(+new Date(deadline) / 1000);
  };

  return (
    <Modal width={448} isOpen onClose={() => navigate(course.path, { replace: true })}>
      <PBold style={{ textAlign: "center" }}>Опубликовать курс</PBold>
      <VSpace s={40} />
      <P>
        Внимание! После публикации курс будет недоступен для редактирования и вы сможете отправить инвайт-код участникам
        для начала тренировок
      </P>
      <VSpace s={24} />
      <PSmall>Укажите дату окончания курса, после которой участники больше не смогут по нему заниматься</PSmall>
      <VSpace s={8} />
      <Input
        value={deadline}
        type="date"
        placeholder="Дата окончания курса"
        onChange={(e) => setDeadline(e.target.value)}
      />
      <VSpace s={24} />
      <ActionButton onClick={create} disabled={!deadline}>
        Опубликовать
      </ActionButton>
    </Modal>
  );
}

export default PublishCourse;
