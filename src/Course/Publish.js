import React, { useState } from "react";
import { useTranslation } from 'react-i18next'
import { Navigate, useNavigate } from "react-router-dom";

import useBreadcrumbs from "../components/useBreadcrumbs";
import { ActionButton } from "../components/button";
import { P, PBold, PSmall } from "../components/typographic";
import { Input } from "../components/input";
import { VSpace } from "../components/layout";
import Modal from "../components/Modal";

function PublishCourse() {
  const { t } = useTranslation();
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
      <PBold style={{ textAlign: "center" }}>{t("course.publish.title")}</PBold>
      <VSpace s={40} />
      <P>{t("course.publish.caution")}</P>
      <VSpace s={24} />
      <PSmall>{t("course.publish.description")}</PSmall>
      <VSpace s={8} />
      <Input
        value={deadline}
        type="date"
        placeholder={t("course.publish.endDatePlaceholder")}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <VSpace s={24} />

      <label style={{ display: 'flex', cursor: 'pointer' }}>
        <input type="checkbox" value={savePhotos} onChange={(e) => setSavePhotos(e.target.checked)}></input>
        <PSmall style={{ marginLeft: 8 }}>{t("course.publish.enablePhotosOffer")}</PSmall>
      </label>

      {savePhotos && (
        <PSmall style={{ marginTop: 8, fontWeight: 'bold' }}>
          {t("course.publish.enablePhotosCaution")}
        </PSmall>
      )}

      <VSpace s={24} />
      <ActionButton onClick={create} disabled={!deadline}>
        {t("course.publish.actionButton")}
      </ActionButton>
    </Modal>
  );
}

export default PublishCourse;
