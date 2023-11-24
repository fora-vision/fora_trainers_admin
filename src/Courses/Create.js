import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next'

import { ActionButton } from "../components/button";
import { PBold } from "../components/typographic";
import { Input, Textarea } from "../components/input";
import { VSpace } from "../components/layout";
import Modal from "../components/Modal";
import store from "../store";

function CreateCourse() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setLoading] = useState(false);
  const isValid = name.length && description.length;

  const create = async () => {
    setLoading(true);
    await store.createCourse(name, description);
    setLoading(false);
    navigate("/");
  };

  return (
    <Modal width={448} isOpen onClose={() => navigate("/courses")}>
      <PBold style={{ textAlign: "center" }}>{t("courses.create.createCourse")}</PBold>
      <VSpace s={40} />
      <Input
        value={name}
        placeholder={t("courses.create.courseNamePlaceholder")}
        onChange={(e) => setName(e.target.value)}
      />
      <VSpace s={16} />
      <Textarea
        value={description}
        placeholder={t("courses.create.courseDescriptionPlaceholder")}
        onChange={(e) => setDescription(e.target.value)}
      />
      <VSpace s={24} />
      <ActionButton onClick={create} disabled={!isValid || isLoading}>
        {t("courses.create.continue")}
      </ActionButton>
    </Modal>
  );
}

export default CreateCourse;
