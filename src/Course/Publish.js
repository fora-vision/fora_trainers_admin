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
  const [savePhotos, setSavePhotos] = useState(false);
  const navigate = useNavigate();

  if (isLoading) return null;
  if (!course || course.inviteCode) {
    return <Navigate to={course.path} replace />;
  }

  const create = async () => {
    navigate(course.path, { replace: true });
    await course.publicate(+new Date(deadline) / 1000, savePhotos);
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

      <label style={{ display: 'flex', cursor: 'pointer' }}>
        <input type="checkbox" value={savePhotos} onChange={(e) => setSavePhotos(e.target.checked)}></input>
        <PSmall style={{ marginLeft: 8 }}>Включить отправку фотографий у пользователей во время тренировки каждые 5 секунд. Фотографии будут отображаться в визуалиции видеоотчетов</PSmall>
      </label>

      {savePhotos && (
        <PSmall style={{ marginTop: 8, fontWeight: 'bold' }}>
          Внимание, мы оповестим пользователей о том, что их тренировки записываются, по возможности не включайте эту опцию.
        </PSmall>
      )}

      <VSpace s={24} />
      <ActionButton onClick={create} disabled={!deadline}>
        Опубликовать
      </ActionButton>
    </Modal>
  );
}

export default PublishCourse;
